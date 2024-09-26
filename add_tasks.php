<?php
$pdo = new PDO('sqlite:container.db');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tittle = $_POST['tittle'];
    $description = $_POST['description'];
    $dueDate = $_POST['dueDate'];

    $stmt = $pdo->prepare("INSERT INTO tasks (tittle, description, dueDate) VALUES (?, ?, ?)");
    $stmt->execute([$tittle, $description, $dueDate]);

    echo json_encode(['success' => true]);
}
?>