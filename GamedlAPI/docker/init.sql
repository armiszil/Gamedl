CREATE DATABASE IF NOT EXISTS gamedl_db;

USE gamedl_db;

CREATE TABLE IF NOT EXISTS Game (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    franchiseName VARCHAR(255) NOT NULL,
    releaseDate DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Characters (
    ID INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gameID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (gameID) REFERENCES Game(ID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


INSERT INTO Game (name, genre, franchiseName, releaseDate)
VALUES
('The Legend of Zelda: Breath of the Wild', 'Action-adventure', 'The Legend of Zelda', '2017-03-03'),
('Super Mario Odyssey', 'Platform', 'Super Mario', '2017-10-27'),
('The Witcher 3: Wild Hunt', 'Role-playing', 'The Witcher', '2015-05-19');

INSERT INTO Characters (name, role, gender, age, gameID)
VALUES
('Link', 'Protagonist', 'Male', 17, 1),
('Zelda', 'Supporting', 'Female', 17, 1),
('Mario', 'Protagonist', 'Male', 26, 2),
('Princess Peach', 'Supporting', 'Female', 24, 2),
('Geralt of Rivia', 'Protagonist', 'Male', 100, 3),
('Ciri', 'Supporting', 'Female', 21, 3);





