CREATE DATABASE IF NOT EXISTS landing_page_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE landing_page_db;

CREATE TABLE IF NOT EXISTS content (
  id INT PRIMARY KEY DEFAULT 1,
  heroTitle VARCHAR(255) NOT NULL DEFAULT 'Default Sarlavha',
  heroSubtitle VARCHAR(500) NOT NULL DEFAULT 'Default Kichik sarlavha',
  buttonText VARCHAR(100) NOT NULL DEFAULT "Bog'lanish",
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO content (id, heroTitle, heroSubtitle, buttonText)
VALUES (1, 'Tabiiy Go''zalligingizni Kashf Eting', 'O''zingizga g''amxo''rlik va ishonch uyg''unlashgan makon', "Bog''lanish")
ON DUPLICATE KEY UPDATE id = id;

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'Sparkles',
  sort_order INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO services (title, description, icon, sort_order) VALUES
('Manikyur', 'Professional manikyur xizmatlari', 'Sparkles', 1),
('Massaj', 'Relaksatsiya beruvchi massaj', 'Heart', 2),
('Laminatsiya', 'Kirpik va qosh laminatsiyasi', 'Eye', 3),
('Depilyatsiya', 'Yuqori sifatli depilyatsiya', 'Scissors', 4)
ON DUPLICATE KEY UPDATE id = id;

CREATE TABLE IF NOT EXISTS about (
  id INT PRIMARY KEY DEFAULT 1,
  title VARCHAR(255) NOT NULL DEFAULT 'Bizning Tariximiz',
  description TEXT NOT NULL,
  value1_title VARCHAR(255) NOT NULL DEFAULT 'Hijyen',
  value1_desc VARCHAR(500) NOT NULL DEFAULT 'Yuqori darajadagi tozalik',
  value2_title VARCHAR(255) NOT NULL DEFAULT 'Professional',
  value2_desc VARCHAR(500) NOT NULL DEFAULT 'Tajribali mutaxassislar',
  value3_title VARCHAR(255) NOT NULL DEFAULT 'Konfor',
  value3_desc VARCHAR(500) NOT NULL DEFAULT 'Qulay muhit',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO about (id, title, description, value1_title, value1_desc, value2_title, value2_desc, value3_title, value3_desc)
VALUES (1, 'Bizning Tariximiz', 'Feyza Aura - go''zallik va ishonch uyg''unlashgan maskan. Biz mijozlarimizga eng yaxshi xizmatni taqdim etamiz.', 'Hijyen', 'Yuqori darajadagi tozalik va sterilizatsiya', 'Professional', 'Tajribali va sertifikatlangan mutaxassislar', 'Konfor', 'Qulay va shinam muhit')
ON DUPLICATE KEY UPDATE id = id;

CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255) DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO gallery (image_url, alt_text, sort_order) VALUES
('/uploads/gallery1.jpg', 'Nail polish collection', 1),
('/uploads/gallery2.jpg', 'Beauty tools', 2),
('/uploads/gallery3.jpg', 'Spa session', 3),
('/uploads/gallery4.jpg', 'Beauty products', 4),
('/uploads/gallery5.png', 'Manicure process', 5),
('/uploads/gallery6.png', 'Lash lamination', 6),
('/uploads/gallery7.png', 'Facial massage', 7)
ON DUPLICATE KEY UPDATE id = id;

CREATE TABLE IF NOT EXISTS faq (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO faq (question, answer, sort_order) VALUES
('Qanday qilib bron qilish mumkin?', 'Biz bilan telefon yoki telegram orqali bog''lanib bron qilishingiz mumkin.', 1),
('Qanday to''lov turlari mavjud?', 'Naqd va plastik karta orqali to''lov qilishingiz mumkin.', 2),
('Xizmat ko''rsatish vaqti?', 'Dushanbadan Shanbagacha 10:00 dan 20:00 gacha xizmat ko''rsatamiz.', 3)
ON DUPLICATE KEY UPDATE id = id;

CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(255) DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO certificates (image_url, title, sort_order) VALUES
('/uploads/sertifikat-1.png', '', 1),
('/uploads/sertifikat-2.png', '', 2),
('/uploads/sertifikat-3.png', '', 3),
('/uploads/sertifikat-4.png', '', 4),
('/uploads/sertifikat-5.png', '', 5)
ON DUPLICATE KEY UPDATE id = id;

CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  sort_order INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO reviews (name, text, rating, sort_order) VALUES
('Sevara', 'Juda yaxshi xizmat! Manikyur juda chiroyli chiqdi.', 5, 1),
('Aziza', 'Massajdan keyin o''zimni butunlay yangilgandek his qildim.', 5, 2),
('Malika', 'Kirpik laminatsiyasi ajoyib natija berdi. Tavsiya qilaman!', 5, 3)
ON DUPLICATE KEY UPDATE id = id;

CREATE TABLE IF NOT EXISTS contact (
  id INT PRIMARY KEY DEFAULT 1,
  phone VARCHAR(50) NOT NULL DEFAULT '+998 99 723 21 32',
  telegram VARCHAR(100) NOT NULL DEFAULT '@Feyza_aura',
  telegram_link VARCHAR(255) NOT NULL DEFAULT 'https://t.me/Feyza_aura',
  instagram VARCHAR(100) NOT NULL DEFAULT '@feyza_aura',
  instagram_link VARCHAR(255) NOT NULL DEFAULT 'https://www.instagram.com/feyza_aura/',
  location VARCHAR(255) NOT NULL DEFAULT 'Toshkent, O''zbekiston',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO contact (id, phone, telegram, telegram_link, instagram, instagram_link, location)
VALUES (1, '+998 99 723 21 32', '@Feyza_aura', 'https://t.me/Feyza_aura', '@feyza_aura', 'https://www.instagram.com/feyza_aura/', 'Toshkent, O''zbekiston')
ON DUPLICATE KEY UPDATE id = id;

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
