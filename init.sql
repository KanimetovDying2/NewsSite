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

INSERT INTO news (id, title, content, image_url) VALUES 
(44, 'COOLKID CARNIVAL - СЕГОДНЯ ОТКРЫТ', 'По скольку Coolkid не справился с заданием и испортил праздник, вся его команда друзей будет нести наказание вместо него. Потому что Coolkid всего лишь 8 лет.', NULL);

INSERT INTO comments (news_id, author, text) VALUES 
(44, 'Noli', 'Ты сам говорил что ты мелкий сам справишься, теперь нас вообще никуда не отпустят из за тебя!'),
(44, 'Coolkid', 'ХАХАХАХАХАХАХАХАХАХА'),
(44, 'Noli', 'Я сегодня закончу с void rush и зайду к тебе'),
(44, 'Coolkid', 'ВСЕ НЕ ЗАИКАЙСЯ, ТЫ ОБМАНУЛ НАРОД, ВСЕ ДОСВИДАНИЕ САМ ВИНОВАТ ХАХАХАХХА'),
(44, '1x1x1x1', 'Че вы тут устроили все? Вам снова накидать по башке чтобы вы перестали.'),
(44, 'John Doe', 'Вы МОЖЕТЕ мою КУРИЦУ забр АААТь я застрЯл выйти не смогу голодный ээ'),
(44, '1x1x1x1', 'Кулкид её съел.'),
(44, 'John Doe', 'ВШdhDHSHDSOFPOKJFSDHFUSNSEGIDYFG');