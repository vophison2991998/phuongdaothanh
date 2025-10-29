-- 🧹 XÓA BẢNG CŨ (nếu có)
DROP TABLE IF EXISTS admin_hobby CASCADE;
DROP TABLE IF EXISTS admin_reference CASCADE;
DROP TABLE IF EXISTS admin_activity CASCADE;
DROP TABLE IF EXISTS admin_project CASCADE;
DROP TABLE IF EXISTS admin_certificate CASCADE;
DROP TABLE IF EXISTS admin_award CASCADE;
DROP TABLE IF EXISTS admin_skill CASCADE;
DROP TABLE IF EXISTS admin_education CASCADE;
DROP TABLE IF EXISTS admin_work_experience CASCADE;
DROP TABLE IF EXISTS admin_career_objective CASCADE;
DROP TABLE IF EXISTS admin_profile CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS hobby CASCADE;
DROP TABLE IF EXISTS reference CASCADE;
DROP TABLE IF EXISTS activity CASCADE;
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS certificate CASCADE;
DROP TABLE IF EXISTS award CASCADE;
DROP TABLE IF EXISTS skill CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS work_experience CASCADE;
DROP TABLE IF EXISTS career_objective CASCADE;
DROP TABLE IF EXISTS user_info CASCADE;
DROP TABLE IF EXISTS admin CASCADE;

-- 🏗️ TẠO BẢNG ADMIN
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 🏗️ TẠO BẢNG CHI TIẾT ADMIN
CREATE TABLE admin_profile (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    full_name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_career_objective (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    objective TEXT
);

CREATE TABLE admin_work_experience (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    position VARCHAR(100),
    company VARCHAR(150),
    start_year INT,
    end_year INT,
    description TEXT
);

CREATE TABLE admin_education (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    school VARCHAR(150),
    major VARCHAR(150),
    start_year INT,
    end_year INT,
    achievement TEXT
);

CREATE TABLE admin_skill (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    level VARCHAR(50)
);

CREATE TABLE admin_award (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    year INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE admin_certificate (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    year INT,
    name VARCHAR(200),
    organization VARCHAR(150)
);

CREATE TABLE admin_project (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    year INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE admin_activity (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    year_start INT,
    year_end INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE admin_reference (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    name VARCHAR(100),
    position VARCHAR(100),
    company VARCHAR(150),
    phone VARCHAR(20),
    email VARCHAR(150)
);

CREATE TABLE admin_hobby (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    hobby_name VARCHAR(150)
);

-- 🏗️ TẠO BẢNG USER (thuộc ADMIN)
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 🏗️ TẠO BẢNG CHI TIẾT USER
CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    full_name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE career_objective (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    objective TEXT
);

CREATE TABLE work_experience (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    position VARCHAR(100),
    company VARCHAR(150),
    start_year INT,
    end_year INT,
    description TEXT
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    school VARCHAR(150),
    major VARCHAR(150),
    start_year INT,
    end_year INT,
    achievement TEXT
);

CREATE TABLE skill (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    level VARCHAR(50)
);

CREATE TABLE award (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    year INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE certificate (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    year INT,
    name VARCHAR(200),
    organization VARCHAR(150)
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    year INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    year_start INT,
    year_end INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE reference (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    name VARCHAR(100),
    position VARCHAR(100),
    company VARCHAR(150),
    phone VARCHAR(20),
    email VARCHAR(150)
);

CREATE TABLE hobby (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    hobby_name VARCHAR(150)
);

-- 🧩 DỮ LIỆU DEMO ADMIN
INSERT INTO admin (username, password) VALUES
('admin1', '123456'),
('admin2', '123456');

INSERT INTO admin_profile (admin_id, full_name, email, phone, address)
VALUES
(1, 'Nguyễn Văn A', 'vana@system.com', '0909123456', '123 Đường ABC, Quận 1, TP.HCM'),
(2, 'Trần Thị B', 'thib@system.com', '0912123456', '456 Đường DEF, Quận 3, TP.HCM');

INSERT INTO admin_career_objective (admin_id, objective)
VALUES (1, 'Quản lý toàn bộ hoạt động hệ thống...'),
       (2, 'Phát triển chiến lược nhân sự & công nghệ.');

INSERT INTO admin_work_experience (admin_id, position, company, start_year, end_year, description)
VALUES
(1, 'CEO', 'NTD Tech', 2020, NULL, 'Điều hành toàn bộ công ty.'),
(2, 'COO', 'ABC Corp', 2019, NULL, 'Quản lý vận hành & nhân sự.');

INSERT INTO admin_education (admin_id, school, major, start_year, end_year, achievement)
VALUES
(1, 'Đại học Kinh tế TOPCV', 'Quản trị kinh doanh', 2010, 2014, 'Xuất sắc'),
(2, 'Đại học Ngoại thương', 'Quản lý nhân sự', 2011, 2015, 'Khá');

INSERT INTO admin_skill (admin_id, skill_name, level)
VALUES
(1, 'Lãnh đạo', 'Xuất sắc'),
(1, 'Quản lý dự án', 'Tốt'),
(1, 'Marketing chiến lược', 'Tốt'),
(2, 'Phân tích dữ liệu', 'Tốt'),
(2, 'Quản lý nhân sự', 'Khá');

INSERT INTO admin_award (admin_id, year, title, description)
VALUES
(1, 2023, 'CEO xuất sắc của năm', 'Được trao bởi Hiệp hội Doanh nghiệp Việt Nam'),
(2, 2022, 'Nhà quản lý trẻ tiêu biểu', 'Giải thưởng dành cho lãnh đạo trẻ');

INSERT INTO admin_certificate (admin_id, year, name, organization)
VALUES
(1, 2021, 'Chứng chỉ Quản lý dự án chuyên nghiệp', 'PMI'),
(1, 2020, 'Chứng chỉ Marketing kỹ thuật số nâng cao', 'Google'),
(2, 2021, 'Chứng chỉ Quản lý nhân sự', 'HR Institute');

INSERT INTO admin_project (admin_id, year, title, description)
VALUES
(1, 2023, 'Phát triển hệ thống CRM nội bộ', 'Triển khai toàn bộ hệ thống CRM cho công ty.'),
(1, 2022, 'Ra mắt sản phẩm mới NTD Tech', 'Quản lý dự án từ ý tưởng đến thị trường.'),
(2, 2022, 'Cải tiến quy trình tuyển dụng', 'Tối ưu hóa quy trình tuyển dụng và onboarding.');

INSERT INTO admin_activity (admin_id, year_start, year_end, title, description)
VALUES
(1, 2023, 2023, 'Hội thảo CEO Việt Nam', 'Diễn giả chia sẻ chiến lược phát triển doanh nghiệp.'),
(2, 2022, 2022, 'Workshop HR', 'Hướng dẫn quản lý nhân sự hiệu quả cho startup.');

INSERT INTO admin_reference (admin_id, name, position, company, phone, email)
VALUES
(1, 'Nguyễn Thị Minh Hằng', 'Head of Marketing', 'NTD Tech', '0988123456', 'hang.nguyen@ntdtech.vn'),
(2, 'Trần Văn Khoa', 'HR Director', 'ABC Corp', '0912345678', 'khoa.tran@abccorp.vn');

INSERT INTO admin_hobby (admin_id, hobby_name)
VALUES
(1, 'Đọc sách quản trị'),
(1, 'Du lịch khám phá'),
(1, 'Golf'),
(2, 'Chạy bộ'),
(2, 'Đọc sách kinh doanh');

-- 🧩 DỮ LIỆU DEMO USER
INSERT INTO "user" (admin_id, username, password) VALUES
(1, 'user1', '123456'),
(1, 'user2', '123456'),
(2, 'user3', '123456');

INSERT INTO user_info (user_id, full_name, email, phone, address)
VALUES
(1, 'Phạm Minh D', 'minhd@example.com', '0909000111', '12 Nguyễn Trãi, Hà Nội'),
(2, 'Võ Thị E', 'thie@example.com', '0909000222', '34 Lý Thường Kiệt, Đà Nẵng'),
(3, 'Đỗ Văn F', 'vanf@example.com', '0909000333', '56 Pasteur, TP.HCM');

INSERT INTO career_objective (user_id, objective)
VALUES
(1, 'Xây dựng chiến lược nội dung sáng tạo...'),
(2, 'Phát triển kỹ năng lập trình và dự án...'),
(3, 'Tham gia dự án nghiên cứu và phát triển.');

INSERT INTO work_experience (user_id, position, company, start_year, end_year, description)
VALUES
(1, 'Content Leader', 'NTD Tech', 2023, NULL, 'Xây dựng chiến lược nội dung cho website, social media...'),
(1, 'Content Executive', 'NDS Agency', 2019, 2023, 'Triển khai hơn 100 chiến dịch nội dung...'),
(2, 'Developer', 'ABC Software', 2022, NULL, 'Phát triển ứng dụng web và mobile...');

INSERT INTO education (user_id, school, major, start_year, end_year, achievement)
VALUES
(1, 'Đại học Kinh tế TOPCV', 'Public Relation & Advertising', 2015, 2019, 'Đạt giải Nhì cuộc thi Chiến lược truyền thông sáng tạo'),
(2, 'Đại học Bách Khoa', 'Công nghệ thông tin', 2018, 2022, 'Xuất sắc');

INSERT INTO skill (user_id, skill_name, level)
VALUES
(1, 'Kỹ năng giao tiếp', 'Thành thạo'),
(1, 'Kỹ năng lãnh đạo', 'Tốt'),
(2, 'Lập trình Python', 'Thành thạo'),
(2, 'Quản lý dự án', 'Tốt');

INSERT INTO award (user_id, year, title, description)
VALUES
(1, 2022, 'Top 5 chiến dịch Content hiệu quả nhất năm', ''),
(2, 2023, 'Sinh viên xuất sắc ngành CNTT', 'Đại học Bách Khoa');

INSERT INTO certificate (user_id, year, name, organization)
VALUES
(1, 2022, 'Google Digital Garage: Fundamentals of Digital Marketing', 'Google'),
(1, 2020, 'Meta Certified Digital Marketing Associate', 'Meta'),
(2, 2023, 'Chứng chỉ lập trình Python nâng cao', 'Coursera');

INSERT INTO project (user_id, year, title, description)
VALUES
(1, 2024, 'Ra mắt sản phẩm công nghệ mới NTD Tech', 'Phối hợp Product & Growth xây dựng nội dung đa kênh...'),
(2, 2023, 'Website bán hàng trực tuyến', 'Thiết kế & triển khai hệ thống website thương mại điện tử.');

INSERT INTO activity (user_id, year_start, year_end, title, description)
VALUES
(1, 2023, 2023, 'Workshop Content Marketing thời đại AI', 'Chia sẻ tại Học viện Báo chí...'),
(2, 2022, 2022, 'Hackathon Sinh viên CNTT', 'Tham gia phát triển giải pháp AI.');

INSERT INTO reference (user_id, name, position, company, phone, email)
VALUES
(1, 'Nguyễn Thị Minh Hằng', 'Head of Marketing', 'NTD Tech', '0988123456', 'hang.nguyen@ntdtech.vn'),
(2, 'Trần Văn Nam', 'Team Lead', 'ABC Software', '0912345678', 'nam.tran@abcsoftware.vn');

INSERT INTO hobby (user_id, hobby_name)
VALUES
(1, 'Đọc sách'),
(1, 'Đi du lịch'),
(1, 'Phát triển bản thân'),
(2, 'Chơi cờ vua'),
(2, 'Chạy bộ');



ALTER TABLE admin_profile
ADD COLUMN avatar_url TEXT DEFAULT 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
ALTER TABLE user_info
ADD COLUMN avatar_url TEXT DEFAULT 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

ALTER TABLE admin_profile
ADD COLUMN gender VARCHAR(20),
ADD COLUMN religion VARCHAR(50);

-- 🧩 Thêm 2 cột mới cho bảng user_info
ALTER TABLE user_info
ADD COLUMN gender VARCHAR(20),
ADD COLUMN religion VARCHAR(50);

UPDATE admin_profile
SET gender = 'Nam', religion = 'Phật giáo'
WHERE admin_id = 1;

UPDATE admin_profile
SET gender = 'Nữ', religion = 'Thiên Chúa giáo'
WHERE admin_id = 2;

UPDATE admin_profile
SET gender = 'Nam', religion = 'Không tôn giáo'
WHERE admin_id = 3;



-- 🧩 Thêm cột birth_date cho admin_profile
ALTER TABLE admin_profile
ADD COLUMN birth_date DATE;

-- 🧩 Thêm cột birth_date cho user_info
ALTER TABLE user_info
ADD COLUMN birth_date DATE;
-- Admin profile
UPDATE admin_profile
SET birth_date = '1985-05-12', gender = 'Nam', religion = 'Phật giáo'
WHERE admin_id = 1;

UPDATE admin_profile
SET birth_date = '1990-09-22', gender = 'Nữ', religion = 'Thiên Chúa giáo'
WHERE admin_id = 2;
-- User info
UPDATE user_info
SET birth_date = '1998-03-14', gender = 'Nữ', religion = 'Không tôn giáo'
WHERE user_id = 1;

UPDATE user_info
SET birth_date = '2000-11-05', gender = 'Nam', religion = 'Phật giáo'
WHERE user_id = 2;

UPDATE user_info
SET birth_date = '1999-06-28', gender = 'Nam', religion = 'Tin Lành'
WHERE user_id = 3;



-- Admin profile
ALTER TABLE admin_profile
ADD COLUMN position VARCHAR(100);

-- User info
ALTER TABLE user_info
ADD COLUMN position VARCHAR(100);

-- Admin profile
UPDATE admin_profile
SET position = 'CEO'
WHERE admin_id = 1;

UPDATE admin_profile
SET position = 'COO'
WHERE admin_id = 2;

-- User info
UPDATE user_info
SET position = 'Content Leader'
WHERE user_id = 1;

UPDATE user_info
SET position = 'Developer'
WHERE user_id = 2;

UPDATE user_info
SET position = 'Project Manager'
WHERE user_id = 3;
