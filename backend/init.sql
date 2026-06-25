CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL
);

-- Seed Initial Test Content:
INSERT INTO todos (task) VALUES ('Buy milk and groceries');
INSERT INTO todos (task) VALUES ('Complete Docker-compose configuration');
INSERT INTO todos (task) VALUES ('Test React frontend integration');