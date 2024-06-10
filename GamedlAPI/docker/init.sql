CREATE DATABASE IF NOT EXISTS gamedl_db;

USE gamedl_db;

CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    franchise_name VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    game_id_fk INT NOT NULL,
    FOREIGN KEY (game_id_fk) REFERENCES games(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


INSERT INTO games (name, genre, franchise_name, release_date)
VALUES
('The Legend of Zelda: Breath of the Wild', 'Action-adventure', 'The Legend of Zelda', '2017-03-03'),
('Super Mario Odyssey', 'Platform', 'Super Mario', '2017-10-27'),
('The Witcher 3: Wild Hunt', 'Role-playing', 'The Witcher', '2015-05-19');

INSERT INTO characters (name, role, gender, age, game_id_fk)
VALUES
('Link', 'Protagonist', 'Male', 17, 1),
('Zelda', 'Supporting', 'Female', 17, 1),
('Mario', 'Protagonist', 'Male', 26, 2),
('Princess Peach', 'Supporting', 'Female', 24, 2),
('Geralt of Rivia', 'Protagonist', 'Male', 100, 3),
('Ciri', 'Supporting', 'Female', 21, 3);





