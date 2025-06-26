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
        // Upcoming tasks (top N by deadline)
        if (isset($_GET['upcoming']) && $_GET['upcoming'] == '1') {
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 3;
            $sql = "SELECT * FROM tasks WHERE user_id=$user_id AND completed=0 AND deadline IS NOT NULL ORDER BY deadline ASC LIMIT $limit";
            $result = $conn->query($sql);
            $tasks = [];
            while ($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
            echo json_encode(['success' => true, 'tasks' => $tasks]);
            break;
        }
        // Dashboard counter jika ada parameter dashboard=1
        if (isset($_GET['dashboard']) && $_GET['dashboard'] == '1') {
            $now = date('Y-m-d H:i:s');
            $today = date('Y-m-d');
            // Overdue: deadline <= sekarang
            $sql = "SELECT COUNT(*) as count FROM tasks WHERE user_id=$user_id AND deadline <= '$now' AND completed=0";
            $overdue = $conn->query($sql)->fetch_assoc()['count'];
            // Today: deadline > sekarang DAN tanggal deadline = hari ini
            $sql = "SELECT COUNT(*) as count FROM tasks WHERE user_id=$user_id AND deadline > '$now' AND DATE(deadline) = '$today' AND completed=0";
            $today_count = $conn->query($sql)->fetch_assoc()['count'];
            // Upcoming: deadline > sekarang DAN tanggal deadline > hari ini
            $sql = "SELECT COUNT(*) as count FROM tasks WHERE user_id=$user_id AND deadline > '$now' AND DATE(deadline) > '$today' AND completed=0";
            $upcoming = $conn->query($sql)->fetch_assoc()['count'];
            echo json_encode([
                'success' => true,
                'dashboard' => [
                    'upcoming' => intval($upcoming),
                    'today' => intval($today_count),
                    'overdue' => intval($overdue)
                ]
            ]);
            break;
        }
        // Default: list semua task
        $result = $conn->query("SELECT * FROM tasks WHERE user_id = $user_id ORDER BY created_at DESC");
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
        $sql = "INSERT INTO tasks (user_id, title, description, deadline, completed, created_at) VALUES ($user_id, '$title', '$desc', " . ($deadline ? "'$deadline'" : 'NULL') . ", 0, NOW())";
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
        if (isset($data['title'])) $fields[] = "title='" . $conn->real_escape_string($data['title']) . "'";
        if (isset($data['description'])) $fields[] = "description='" . $conn->real_escape_string($data['description']) . "'";
        if (isset($data['deadline'])) $fields[] = "deadline='" . $conn->real_escape_string($data['deadline']) . "'";
        if (isset($data['completed'])) $fields[] = "completed=" . (intval($data['completed']) ? 1 : 0);
        if (!$fields) {
            echo json_encode(['success' => false, 'error' => 'No fields to update']);
            exit();
        }
        $sql = "UPDATE tasks SET " . implode(", ", $fields) . " WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
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