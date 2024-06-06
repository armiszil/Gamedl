CREATE DATABASE IF NOT EXISTS gamedl_db;

USE gamedl_db;

CREATE TABLE IF NOT EXISTS my_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO my_table (name) VALUES
('Alice'),
('Bob'),
('Charlie');
