<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(); }

header('Content-Type: application/json');
require_once 'db.php';

// Hardcode user id (nanti bisa pakai session/login)
$userId = 1;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['pet_type'], $data['image'], $data['name'], $data['price'])) {
        echo json_encode(['success' => false, 'error' => 'Missing fields']);
        exit();
    }
    $petType = $data['pet_type'];
    $petImage = $data['image'];
    $petName = $data['name'];
    $petPrice = intval($data['price']);

    // Cek apakah user sudah punya pet tipe ini
    $sql = "SELECT id FROM pets WHERE user_id = ? AND pet_type = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $userId, $petType);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'error' => 'You already own this pet type']);
        exit();
    }

    // Cek coins user
    $sql = "SELECT coins FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    if (!$user || $user['coins'] < $petPrice) {
        echo json_encode(['success' => false, 'error' => 'Not enough coins']);
        exit();
    }

    // Kurangi coins user
    $sql = "UPDATE users SET coins = coins - ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $petPrice, $userId);
    $stmt->execute();

    // Insert pet baru
    $initHealth = ($petType === 'Penguin') ? 200 : 100;
    $sql = "INSERT INTO pets (user_id, pet_type, health, status) VALUES (?, ?, ?, 'Sehat')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('isi', $userId, $petType, $initHealth);
    $stmt->execute();
    $petId = $conn->insert_id;

    // Return data pet baru dan coins baru
    $sql = "SELECT coins FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $pet = [
        'id' => $petId,
        'name' => $petName,
        'status' => 'Sehat',
        'image' => $petImage,
        'type' => $petType,
        'health' => $initHealth
    ];
    echo json_encode(['success' => true, 'pet' => $pet, 'coins' => $user['coins']]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Ambil user_id dari parameter GET jika ada, fallback ke 1
    $userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : 1;
    // Hapus semua pets user dan kembalikan coins
    $sql = "SELECT pet_type FROM pets WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $totalRefund = 0;
    while ($row = $result->fetch_assoc()) {
        if ($row['pet_type'] === 'Cat') $totalRefund += 240;
        if ($row['pet_type'] === 'Penguin') $totalRefund += 320;
    }
    // Hapus semua pets
    $sql = "DELETE FROM pets WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    // Tambahkan coins ke user
    if ($totalRefund > 0) {
        $sql = "UPDATE users SET coins = coins + ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $totalRefund, $userId);
        $stmt->execute();
    }
    // Ambil coins baru
    $sql = "SELECT coins FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    echo json_encode(['success' => true, 'coins' => $user['coins']]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ambil semua pets user
    $userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : 1;
    $sql = "SELECT id, pet_type as name, health, status FROM pets WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $pets = [];
    while ($row = $result->fetch_assoc()) {
        // Tambahkan image sesuai tipe dan status
        $img = '';
        if ($row['name'] === 'Cat') {
            if ($row['status'] === 'Sehat') $img = '/cat-sehat.png';
            else if ($row['status'] === 'Sakit') $img = '/cat-sakit.png';
            else $img = '/mati.png';
        } else if ($row['name'] === 'Penguin') {
            if ($row['status'] === 'Sehat') $img = '/penguin-sehat.png';
            else if ($row['status'] === 'Sakit') $img = '/penguin-sakit.png';
            else $img = '/mati.png';
        }
        $pets[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'status' => $row['status'],
            'image' => $img,
            'health' => intval($row['health'])
        ];
    }
    echo json_encode(['success' => true, 'pets' => $pets]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']); 