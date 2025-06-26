CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  coins INT DEFAULT 0,
  xp INT DEFAULT 0,
  level INT DEFAULT 1
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  deadline DATETIME,
  completed TINYINT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  pet_type VARCHAR(50),
  health INT DEFAULT 100,
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE store_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(50),
  price INT,
  image VARCHAR(255)
);

CREATE TABLE user_purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_id INT,
  purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (item_id) REFERENCES store_items(id)
);

## Koneksi Database
- Host: `localhost`
- User: `root`
- Password: (kosong)
- Database: `todo_app`

## Contoh Request

### GET Task List
`GET /api/tasks.php?user_id=1`

### Tambah Task
`POST /api/tasks.php`
Body JSON:
```json
{
  "user_id": 1,
  "title": "Belajar PHP",
  "description": "Membuat backend API",
  "deadline": "2024-06-10 23:59:00"
}
```

### Update Task
`PUT /api/tasks.php`
Body JSON:
```json
{
  "id": 2,
  "title": "Belajar PHP Lanjutan",
  "completed": 1
}
```

### Hapus Task
`DELETE /api/tasks.php`
Body JSON:
```json
{
  "id": 2
}
``` 