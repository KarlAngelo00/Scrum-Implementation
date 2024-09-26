<?php
$pdo = new PDO('sqlite:container.db');

$stmt = $pdo->query("SELECT * FROM tasks");
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tasks);
?>se and tables created";
?>