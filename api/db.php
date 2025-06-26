<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'todo_app';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    // Kirim response error sebagai JSON dan hentikan eksekusi
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}
// ... existing code ... 