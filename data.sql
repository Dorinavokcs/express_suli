-- Új adatbázis létrehozása
CREATE DATABASE IF NOT EXISTS userdb
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE userdb;

-- Felhasználók tábla
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nev VARCHAR(255) NOT NULL,
  cim VARCHAR(255) NOT NULL,
  szuletesiDatum DATE
);

-- Adatok beszúrása
INSERT INTO users (nev, cim, szuletesiDatum) VALUES
('Kovács Béla', 'Budapest, Petőfi utca 5.', '1980-03-15'),
('Nagy Anna', 'Debrecen, Kossuth tér 3.', '1992-07-10'),
('Big Lajos', 'Hort, Pék u. 3.', '1995-12-23'),
('Kala Pál', 'Bag, Túr utca 3.', NULL);
