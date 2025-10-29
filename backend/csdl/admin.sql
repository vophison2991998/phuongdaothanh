-- 🧹 XÓA BẢNG CŨ (nếu có)
DROP TABLE IF EXISTS user_info CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS user_profile CASCADE;
DROP TABLE IF EXISTS admin CASCADE;

-- 🏗️ TẠO BẢNG ADMIN
CREATE TABLE IF NOT EXISTS admin (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- 🏗️ TẠO BẢNG USER_PROFILE (liên kết ADMIN)
CREATE TABLE IF NOT EXISTS user_profile (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
  full_name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🏗️ TẠO BẢNG USER (tài khoản người dùng)
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- 🏗️ TẠO BẢNG USER_INFO (liên kết USER)
CREATE TABLE IF NOT EXISTS user_info (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
  full_name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🧩 THÊM DỮ LIỆU MẪU CHO ADMIN (mật khẩu: 123456)
INSERT INTO admin (username, password) VALUES
('admin1', '123456'),
('admin2', '123456'),
('admin3', '123456');

-- 👤 THÊM DỮ LIỆU MẪU CHO USER_PROFILE
INSERT INTO user_profile (admin_id, full_name, email, phone, address)
VALUES
(1, 'Nguyễn Văn A', 'vana@system.com', '0909123456', '123 Đường ABC, Quận 1, TP.HCM'),
(2, 'Trần Thị B', 'thib@system.com', '0912123456', '456 Đường DEF, Quận 3, TP.HCM'),
(3, 'Lê Văn C', 'vanc@system.com', '0988123456', '789 Đường XYZ, Quận 5, TP.HCM');

-- 👥 THÊM DỮ LIỆU MẪU CHO USER (người dùng hệ thống)
INSERT INTO "user" (username, password) VALUES
('user1', '123456'),
('user2', '123456'),
('user3', '123456'),
('user4', '123456');

-- 🧾 THÊM DỮ LIỆU MẪU CHO USER_INFO (liên kết USER)
INSERT INTO user_info (user_id, full_name, email, phone, address)
VALUES
(1, 'Phạm Minh D', 'minhd@example.com', '0909000111', '12 Nguyễn Trãi, Hà Nội'),
(2, 'Võ Thị E', 'thie@example.com', '0909000222', '34 Lý Thường Kiệt, Đà Nẵng'),
(3, 'Đỗ Văn F', 'vanf@example.com', '0909000333', '56 Pasteur, TP.HCM'),
(4, 'Ngô Thị G', 'thig@example.com', '0909000444', '78 Trần Hưng Đạo, Cần Thơ');





-- ✅ KIỂM TRA DANH SÁCH ADMIN & THÔNG TIN HỒ SƠ
SELECT 
  a.id AS admin_id,
  a.username AS admin_username,
  a.password AS admin_password,
  u.full_name AS profile_name,
  u.email AS profile_email,
  u.phone AS profile_phone,
  u.address AS profile_address
FROM admin a
LEFT JOIN user_profile u ON a.id = u.admin_id;

-- ✅ KIỂM TRA DANH SÁCH USER & THÔNG TIN HỒ SƠ
SELECT 
  u.id AS user_id,
  u.username AS user_username,
  u.password AS user_password,
  i.full_name AS info_name,
  i.email AS info_email,
  i.phone AS info_phone,
  i.address AS info_address
FROM "user" u
LEFT JOIN user_info i ON u.id = i.user_id;











