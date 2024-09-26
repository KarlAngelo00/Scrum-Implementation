<?php
$pdo = new PDO('sqlite:container.db');

// Create items table
$pdo->exec("CREATE TABLE IF NOT EXISTS items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL
)");

// Create tasks table
$pdo->exec("CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tittle TEXT NOT NULL,
    description TEXT NOT NULL,
    dueDate TEXT NOT NULL
)");

echo "Database and tables created";
?>
