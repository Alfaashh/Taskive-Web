<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(); }

header('Content-Type: application/json');
require_once 'db.php';

// Hardcode user id (nanti bisa pakai session/login)
$userId = 1;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT id, name, email, coins, xp, level FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    if ($user) {
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'error' => 'User not found']);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    file_put_contents(__DIR__ . '/debug.log', "\nPUT DATA: " . print_r($data, true), FILE_APPEND);
    if (!isset($data['name'], $data['coins'], $data['xp'], $data['level'], $data['email'])) {
        echo json_encode(['success' => false, 'error' => 'Missing fields']);
        exit();
    }
    $sql = "UPDATE users SET name = ?, coins = ?, xp = ?, level = ?, email = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        file_put_contents(__DIR__ . '/debug.log', "\nSQL ERROR: " . $conn->error, FILE_APPEND);
        echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
        exit();
    }
    $stmt->bind_param('siiisi', $data['name'], $data['coins'], $data['xp'], $data['level'], $data['email'], $userId);
    $success = $stmt->execute();
    if ($success) {
        echo json_encode(['success' => true]);
    } else {
        file_put_contents(__DIR__ . '/debug.log', "\nEXEC ERROR: " . $stmt->error, FILE_APPEND);
        echo json_encode(['success' => false, 'error' => 'Update failed: ' . $stmt->error]);
    }
    exit();
}

// Method not allowed
http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']); 