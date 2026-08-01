CREATE DATABASE IF NOT EXISTS news_site;
USE news_site;

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    author VARCHAR(100) DEFAULT 'Anonymous',
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
);

INSERT INTO news (title, content, image_url) VALUES 
('Первая хорошая новость', 'Мне она нравится!', NULL),
('Это плохая новость', 'Мне не понравилась она!', NULL);