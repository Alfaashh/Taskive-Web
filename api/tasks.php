<?php
// === SOLUSI ERROR JSON ===
// Matikan tampilan error/warning agar tidak merusak output JSON
error_reporting(0);
ini_set('display_errors', 0);

// Izinkan request dari Next.js (http://localhost:3000)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
require_once 'db.php';
$method = $_SERVER['REQUEST_METHOD'];

// Set timezone ke Asia/Jakarta
date_default_timezone_set('Asia/Jakarta');

switch ($method) {
    case 'GET':
        $user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
        if (!$user_id) {
            echo json_encode(['success' => false, 'error' => 'user_id required']);
            exit();
        }
        // Update HP pets yang overdue
        $now = date('Y-m-d H:i:s');
        $sql = "SELECT t.id as task_id, t.pet_id, t.deadline, t.completed, p.health, p.id as pid FROM tasks t JOIN pets p ON t.pet_id = p.id WHERE t.user_id=$user_id AND t.completed=0 AND t.deadline IS NOT NULL AND t.pet_id IS NOT NULL AND t.deadline < '$now' AND p.health > 0";
        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()) {
            $days = ceil((strtotime($now) - strtotime($row['deadline'])) / (60*60*24));
            $newHp = max(0, $row['health'] - $days * 10);
            if ($newHp != $row['health']) {
                $conn->query("UPDATE pets SET health=$newHp WHERE id=".$row['pid']);
            }
        }
        // Dashboard stats
        if (isset($_GET['dashboard']) && $_GET['dashboard'] == 1) {
            $now = date('Y-m-d H:i:s');
            $today = date('Y-m-d');
            // Upcoming: deadline > hari ini, belum selesai
            $sql = "SELECT COUNT(*) as cnt FROM tasks WHERE user_id=$user_id AND completed=0 AND deadline > '$today 23:59:59'";
            $upcoming = $conn->query($sql)->fetch_assoc()['cnt'];
            // Today: deadline hari ini, belum selesai
            $sql = "SELECT COUNT(*) as cnt FROM tasks WHERE user_id=$user_id AND completed=0 AND deadline >= '$today 00:00:00' AND deadline <= '$today 23:59:59'";
            $todayCount = $conn->query($sql)->fetch_assoc()['cnt'];
            // Overdue: deadline < sekarang, belum selesai
            $sql = "SELECT COUNT(*) as cnt FROM tasks WHERE user_id=$user_id AND completed=0 AND deadline < '$now' AND deadline IS NOT NULL";
            $overdue = $conn->query($sql)->fetch_assoc()['cnt'];
            echo json_encode([
                'success' => true,
                'dashboard' => [
                    'upcoming' => intval($upcoming),
                    'today' => intval($todayCount),
                    'overdue' => intval($overdue)
                ]
            ]);
            exit();
        }
        // Upcoming tasks limit
        if (isset($_GET['upcoming']) && $_GET['upcoming'] == 1) {
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 3;
            $result = $conn->query("SELECT t.*, p.pet_type, p.health as pet_health, p.status as pet_status, p.id as pet_id, 
              CASE 
                WHEN p.pet_type = 'Cat' AND p.status = 'Sehat' THEN '/cat-sehat.png'
                WHEN p.pet_type = 'Cat' AND p.status = 'Sakit' THEN '/cat-sakit.png'
                WHEN p.pet_type = 'Cat' AND p.status = 'Mati' THEN '/mati.png'
                WHEN p.pet_type = 'Penguin' AND p.status = 'Sehat' THEN '/penguin-sehat.png'
                WHEN p.pet_type = 'Penguin' AND p.status = 'Sakit' THEN '/penguin-sakit.png'
                WHEN p.pet_type = 'Penguin' AND p.status = 'Mati' THEN '/mati.png'
                ELSE NULL END as pet_image
              FROM tasks t 
              LEFT JOIN pets p ON t.pet_id = p.id 
              WHERE t.user_id = $user_id AND t.completed = 0 AND t.deadline IS NOT NULL
              ORDER BY t.deadline ASC
              LIMIT $limit");
            $tasks = [];
            while ($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
            echo json_encode(['success' => true, 'tasks' => $tasks]);
            exit();
        }
        // Default: list semua task + join pet
        $result = $conn->query("SELECT t.*, p.pet_type, p.health as pet_health, p.status as pet_status, p.id as pet_id, 
          CASE 
            WHEN p.pet_type = 'Cat' AND p.status = 'Sehat' THEN '/cat-sehat.png'
            WHEN p.pet_type = 'Cat' AND p.status = 'Sakit' THEN '/cat-sakit.png'
            WHEN p.pet_type = 'Cat' AND p.status = 'Mati' THEN '/mati.png'
            WHEN p.pet_type = 'Penguin' AND p.status = 'Sehat' THEN '/penguin-sehat.png'
            WHEN p.pet_type = 'Penguin' AND p.status = 'Sakit' THEN '/penguin-sakit.png'
            WHEN p.pet_type = 'Penguin' AND p.status = 'Mati' THEN '/mati.png'
            ELSE NULL END as pet_image
          FROM tasks t LEFT JOIN pets p ON t.pet_id = p.id WHERE t.user_id = $user_id ORDER BY t.created_at DESC");
        $tasks = [];
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }
        echo json_encode(['success' => true, 'tasks' => $tasks]);
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        file_put_contents(__DIR__.'/debug.log', date('c')." - POST input: ".json_encode($data)."\n", FILE_APPEND);
        if (!isset($data['user_id'], $data['title'])) {
            echo json_encode(['success' => false, 'error' => 'user_id and title required']);
            exit();
        }
        $user_id = intval($data['user_id']);
        $title = $conn->real_escape_string($data['title']);
        $desc = isset($data['description']) ? $conn->real_escape_string($data['description']) : '';
        $deadline = isset($data['deadline']) ? $conn->real_escape_string($data['deadline']) : null;
        $pet_id = 'NULL';
        if ($deadline) {
            $now = date('Y-m-d H:i:s');
            if ($deadline >= $now) {
                // Assign pet hanya jika deadline >= sekarang
                $sql = "SELECT p.id FROM pets p WHERE p.user_id=$user_id AND p.health > 0";
                $res = $conn->query($sql);
                $pets = [];
                while ($row = $res->fetch_assoc()) {
                    $pets[] = $row['id'];
                }
                if (count($pets) > 0) {
                    $petTaskCounts = [];
                    foreach ($pets as $pid) {
                        $sql2 = "SELECT COUNT(*) as cnt FROM tasks WHERE pet_id=$pid AND completed=0 AND deadline IS NOT NULL";
                        $res2 = $conn->query($sql2);
                        $row2 = $res2->fetch_assoc();
                        $petTaskCounts[$pid] = intval($row2['cnt']);
                    }
                    $minTasks = min($petTaskCounts);
                    $candidates = array_keys($petTaskCounts, $minTasks);
                    $pet_id = intval(min($candidates));
                }
            }
        }
        $sql = "INSERT INTO tasks (user_id, title, description, deadline, completed, created_at, pet_id) VALUES ($user_id, '$title', '$desc', " . ($deadline ? "'$deadline'" : 'NULL') . ", 0, NOW(), $pet_id)";
        file_put_contents(__DIR__.'/debug.log', date('c')." - SQL: ".$sql."\n", FILE_APPEND);
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'task_id' => $conn->insert_id]);
            break;
        } else {
            file_put_contents(__DIR__.'/debug.log', date('c')." - MySQL error: ".$conn->error."\n", FILE_APPEND);
            echo json_encode(['success' => false, 'error' => $conn->error]);
            break;
        }
        echo json_encode(['success'=>false,'error'=>'Unknown error']);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'error' => 'id required']);
            exit();
        }
        $id = intval($data['id']);
        $fields = [];
        $oldTask = $conn->query("SELECT * FROM tasks WHERE id=$id")->fetch_assoc();
        $user_id = $oldTask ? intval($oldTask['user_id']) : 1;
        $oldDeadline = $oldTask ? $oldTask['deadline'] : null;
        $newDeadline = isset($data['deadline']) ? $conn->real_escape_string($data['deadline']) : $oldDeadline;
        $now = date('Y-m-d H:i:s');
        $pet_id_update = null;
        // Logic assign/unassign pet saat edit
        if (empty($oldDeadline) && !empty($newDeadline) && $newDeadline >= $now) {
            // Awalnya tanpa deadline, sekarang ada deadline (dan bukan overdue): assign pet
            $sql = "SELECT p.id FROM pets p WHERE p.user_id=$user_id AND p.health > 0";
            $res = $conn->query($sql);
            $pets = [];
            while ($row = $res->fetch_assoc()) {
                $pets[] = $row['id'];
            }
            if (count($pets) > 0) {
                $petTaskCounts = [];
                foreach ($pets as $pid) {
                    $sql2 = "SELECT COUNT(*) as cnt FROM tasks WHERE pet_id=$pid AND completed=0 AND deadline IS NOT NULL";
                    $res2 = $conn->query($sql2);
                    $row2 = $res2->fetch_assoc();
                    $petTaskCounts[$pid] = intval($row2['cnt']);
                }
                $minTasks = min($petTaskCounts);
                $candidates = array_keys($petTaskCounts, $minTasks);
                $pet_id_update = intval(min($candidates));
            }
        } else if (!empty($oldDeadline) && (empty($newDeadline) || $newDeadline < $now)) {
            // Awalnya ada deadline, sekarang dihapus atau jadi overdue: unassign pet
            $pet_id_update = 'NULL';
        }
        if (isset($data['title'])) $fields[] = "title='" . $conn->real_escape_string($data['title']) . "'";
        if (isset($data['description'])) $fields[] = "description='" . $conn->real_escape_string($data['description']) . "'";
        if (isset($data['deadline'])) $fields[] = "deadline='" . $conn->real_escape_string($data['deadline']) . "'";
        if (isset($data['completed'])) {
            $fields[] = "completed=" . (intval($data['completed']) ? 1 : 0);
            if (intval($data['completed']) == 1) {
                $fields[] = "pet_id=NULL";
            }
        }
        if ($pet_id_update !== null) $fields[] = "pet_id=$pet_id_update";
        if (!$fields) {
            echo json_encode(['success' => false, 'error' => 'No fields to update']);
            exit();
        }
        $sql = "UPDATE tasks SET " . implode(", ", $fields) . " WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
            exit();
        } else {
            file_put_contents(__DIR__.'/debug.log', date('c')." - SQL error (PUT): ".$conn->error."\n", FILE_APPEND);
            echo json_encode(['success' => false, 'error' => $conn->error]);
            exit();
        }
        // fallback (should not reach here)
        echo json_encode(['success' => false, 'error' => 'Unknown error']);
        exit();
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'error' => 'id required']);
            exit();
        }
        $id = intval($data['id']);
        $sql = "DELETE FROM tasks WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
        break;
    default:
        echo json_encode(['success' => false, 'error' => 'Invalid method']);
} 