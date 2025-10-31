-- ============================================================
-- 🧹 XÓA TOÀN BỘ BẢNG CŨ
-- ============================================================
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS career_objective CASCADE;
DROP TABLE IF EXISTS work_experience CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS skill CASCADE;
DROP TABLE IF EXISTS award CASCADE;
DROP TABLE IF EXISTS certificate CASCADE;
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS activity CASCADE;
DROP TABLE IF EXISTS reference CASCADE;
DROP TABLE IF EXISTS hobby CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- ============================================================
-- 🏗️ TẠO BẢNG CHÍNH: ADMIN & USER
-- ============================================================
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- ============================================================
-- 🏗️ BẢNG PROFILE (chung cho cả ADMIN & USER)
-- ============================================================
CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10) CHECK (owner_type IN ('admin', 'user')),
    full_name VARCHAR(100),
    email VARCHAR(150),
    phone VARCHAR(20),
    address TEXT,
    avatar_url TEXT DEFAULT 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    gender VARCHAR(20),
    religion VARCHAR(50),
    birth_date DATE,
    position VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 🏗️ CÁC BẢNG CHUNG
-- ============================================================
CREATE TABLE career_objective (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10) CHECK (owner_type IN ('admin', 'user')),
    objective TEXT
);

CREATE TABLE work_experience (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    position VARCHAR(100),
    company VARCHAR(150),
    start_year INT,
    end_year INT,
    description TEXT
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    school VARCHAR(150),
    major VARCHAR(150),
    start_year INT,
    end_year INT,
    achievement TEXT
);

CREATE TABLE skill (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    skill_name VARCHAR(100),
    level VARCHAR(50)
);

CREATE TABLE award (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    year INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE certificate (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    year INT,
    name VARCHAR(200),
    organization VARCHAR(150)
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    year INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    year_start INT,
    year_end INT,
    title VARCHAR(200),
    description TEXT
);

CREATE TABLE reference (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    name VARCHAR(100),
    position VARCHAR(100),
    company VARCHAR(150),
    phone VARCHAR(20),
    email VARCHAR(150)
);

CREATE TABLE hobby (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    owner_type VARCHAR(10),
    hobby_name VARCHAR(150)
);

-- ============================================================
-- 🧩 DỮ LIỆU MẪU: ADMIN
-- ============================================================
INSERT INTO admin (username, password) VALUES
('admin1', '123456'),
('admin2', '123456');

INSERT INTO profile (owner_id, owner_type, full_name, email, phone, address, gender, religion, birth_date, position, avatar_url)
VALUES
(1, 'admin', 'Nguyễn Văn A', 'vana@system.com', '0909123456', '123 Đường ABC, Quận 1, TP.HCM', 'Nam', 'Phật giáo', '1985-05-12', 'CEO', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'),
(2, 'admin', 'Trần Thị B', 'thib@system.com', '0912123456', '456 Đường DEF, Quận 3, TP.HCM', 'Nữ', 'Thiên Chúa giáo', '1990-09-22', 'COO', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png');

INSERT INTO career_objective (owner_id, owner_type, objective)
VALUES
(1, 'admin', 'Quản lý toàn bộ hoạt động hệ thống...'),
(2, 'admin', 'Phát triển chiến lược nhân sự & công nghệ.');

INSERT INTO work_experience (owner_id, owner_type, position, company, start_year, end_year, description)
VALUES
(1, 'admin', 'CEO', 'NTD Tech', 2020, NULL, 'Điều hành toàn bộ công ty.'),
(2, 'admin', 'COO', 'ABC Corp', 2019, NULL, 'Quản lý vận hành & nhân sự.');

INSERT INTO education (owner_id, owner_type, school, major, start_year, end_year, achievement)
VALUES
(1, 'admin', 'Đại học Kinh tế TOPCV', 'Quản trị kinh doanh', 2010, 2014, 'Xuất sắc'),
(2, 'admin', 'Đại học Ngoại thương', 'Quản lý nhân sự', 2011, 2015, 'Khá');

INSERT INTO skill (owner_id, owner_type, skill_name, level)
VALUES
(1, 'admin', 'Lãnh đạo', 'Xuất sắc'),
(1, 'admin', 'Quản lý dự án', 'Tốt'),
(2, 'admin', 'Phân tích dữ liệu', 'Tốt');

INSERT INTO award (owner_id, owner_type, year, title, description)
VALUES
(1, 'admin', 2023, 'CEO xuất sắc của năm', 'Hiệp hội Doanh nghiệp Việt Nam'),
(2, 'admin', 2022, 'Nhà quản lý trẻ tiêu biểu', 'Lãnh đạo trẻ xuất sắc');

INSERT INTO certificate (owner_id, owner_type, year, name, organization)
VALUES
(1, 'admin', 2021, 'Chứng chỉ Quản lý dự án chuyên nghiệp', 'PMI'),
(2, 'admin', 2020, 'Chứng chỉ Quản lý nhân sự', 'HR Institute');

INSERT INTO project (owner_id, owner_type, year, title, description)
VALUES
(1, 'admin', 2023, 'Phát triển hệ thống CRM nội bộ', 'Triển khai CRM toàn công ty.'),
(2, 'admin', 2022, 'Cải tiến quy trình tuyển dụng', 'Tối ưu hóa tuyển dụng và onboarding.');

INSERT INTO activity (owner_id, owner_type, year_start, year_end, title, description)
VALUES
(1, 'admin', 2023, 2023, 'Hội thảo CEO Việt Nam', 'Diễn giả chia sẻ chiến lược phát triển.'),
(2, 'admin', 2022, 2022, 'Workshop HR', 'Hướng dẫn quản lý nhân sự hiệu quả.');

INSERT INTO reference (owner_id, owner_type, name, position, company, phone, email)
VALUES
(1, 'admin', 'Nguyễn Thị Minh Hằng', 'Head of Marketing', 'NTD Tech', '0988123456', 'hang.nguyen@ntdtech.vn');

INSERT INTO hobby (owner_id, owner_type, hobby_name)
VALUES
(1, 'admin', 'Đọc sách quản trị'),
(1, 'admin', 'Golf'),
(2, 'admin', 'Chạy bộ');

-- ============================================================
-- 🧩 DỮ LIỆU MẪU: USER
-- ============================================================
INSERT INTO "user" (admin_id, username, password) VALUES
(1, 'user1', '123456'),
(1, 'user2', '123456'),
(2, 'user3', '123456');

INSERT INTO profile (owner_id, owner_type, full_name, email, phone, address, gender, religion, birth_date, position)
VALUES
(1, 'user', 'Phạm Minh D', 'minhd@example.com', '0909000111', '12 Nguyễn Trãi, Hà Nội', 'Nữ', 'Không tôn giáo', '1998-03-14', 'Content Leader'),
(2, 'user', 'Võ Thị E', 'thie@example.com', '0909000222', '34 Lý Thường Kiệt, Đà Nẵng', 'Nam', 'Phật giáo', '2000-11-05', 'Developer'),
(3, 'user', 'Đỗ Văn F', 'vanf@example.com', '0909000333', '56 Pasteur, TP.HCM', 'Nam', 'Tin Lành', '1999-06-28', 'Project Manager');

INSERT INTO career_objective (owner_id, owner_type, objective)
VALUES
(1, 'user', 'Xây dựng chiến lược nội dung sáng tạo...'),
(2, 'user', 'Phát triển kỹ năng lập trình và dự án...'),
(3, 'user', 'Tham gia dự án nghiên cứu và phát triển.');

INSERT INTO work_experience (owner_id, owner_type, position, company, start_year, end_year, description)
VALUES
(1, 'user', 'Content Leader', 'NTD Tech', 2023, NULL, 'Xây dựng chiến lược nội dung.'),
(2, 'user', 'Developer', 'ABC Software', 2022, NULL, 'Phát triển ứng dụng web.');

INSERT INTO education (owner_id, owner_type, school, major, start_year, end_year, achievement)
VALUES
(1, 'user', 'ĐH Kinh tế TOPCV', 'Truyền thông', 2015, 2019, 'Giải Nhì chiến lược truyền thông.'),
(2, 'user', 'ĐH Bách Khoa', 'CNTT', 2018, 2022, 'Xuất sắc.');

INSERT INTO skill (owner_id, owner_type, skill_name, level)
VALUES
(1, 'user', 'Giao tiếp', 'Tốt'),
(1, 'user', 'Lãnh đạo', 'Khá'),
(2, 'user', 'Lập trình Python', 'Thành thạo');

INSERT INTO award (owner_id, owner_type, year, title, description)
VALUES
(1, 'user', 2022, 'Top 5 chiến dịch Content hiệu quả nhất năm', ''),
(2, 'user', 2023, 'Sinh viên xuất sắc ngành CNTT', '');

INSERT INTO certificate (owner_id, owner_type, year, name, organization)
VALUES
(1, 'user', 2022, 'Google Digital Garage', 'Google'),
(2, 'user', 2023, 'Python Advanced', 'Coursera');

INSERT INTO project (owner_id, owner_type, year, title, description)
VALUES
(1, 'user', 2024, 'Ra mắt sản phẩm công nghệ mới', 'Xây dựng nội dung đa kênh...'),
(2, 'user', 2023, 'Website bán hàng', 'Thiết kế hệ thống eCommerce.');

INSERT INTO activity (owner_id, owner_type, year_start, year_end, title, description)
VALUES
(1, 'user', 2023, 2023, 'Workshop Content AI', 'Chia sẻ tại Học viện Báo chí.'),
(2, 'user', 2022, 2022, 'Hackathon CNTT', 'Phát triển giải pháp AI.');

INSERT INTO reference (owner_id, owner_type, name, position, company, phone, email)
VALUES
(1, 'user', 'Nguyễn Thị Minh Hằng', 'Head of Marketing', 'NTD Tech', '0988123456', 'hang.nguyen@ntdtech.vn');

INSERT INTO hobby (owner_id, owner_type, hobby_name)
VALUES
(1, 'user', 'Đọc sách'),
(1, 'user', 'Đi du lịch'),
(2, 'user', 'Chạy bộ');





SELECT 
    a.id AS admin_id,
    a.username,
    p.full_name,
    p.email,
    p.phone,
    p.address,
    p.gender,
    p.birth_date,
    p.position,
    p.avatar_url,
    co.objective AS career_objective,

    -- Kinh nghiệm làm việc
    (SELECT json_agg(json_build_object('position', position, 'company', company, 'start_year', start_year, 'end_year', end_year))
     FROM work_experience WHERE owner_type='admin' AND owner_id=a.id) AS work_experience,

    -- Học vấn
    (SELECT json_agg(json_build_object('school', school, 'major', major, 'start_year', start_year, 'end_year', end_year))
     FROM education WHERE owner_type='admin' AND owner_id=a.id) AS education,

    -- Kỹ năng
    (SELECT json_agg(json_build_object('skill_name', skill_name, 'level', level))
     FROM skill WHERE owner_type='admin' AND owner_id=a.id) AS skills,

    -- Dự án
    (SELECT json_agg(json_build_object('title', title, 'year', year, 'description', description))
     FROM project WHERE owner_type='admin' AND owner_id=a.id) AS projects

FROM admin a
LEFT JOIN profile p ON p.owner_type='admin' AND p.owner_id=a.id
LEFT JOIN career_objective co ON co.owner_type='admin' AND co.owner_id=a.id
WHERE a.id = 1;





