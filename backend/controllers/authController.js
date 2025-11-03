import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ message: "Thiếu thông tin" });

    const exist = await pool.query("SELECT * FROM admin WHERE username = $1", [username]);
    if (exist.rows.length > 0) return res.status(400).json({ message: "Tài khoản đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashed]
    );

    res.status(201).json({ message: "Tạo tài khoản thành công", admin: result.rows[0] });
  } catch (err) {
    console.error("Đăng ký lỗi:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM admin WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    const admin = result.rows[0];

    // ⚠️ Bỏ bcrypt, so sánh trực tiếp (chỉ dùng cho môi trường test)
    if (password !== admin.password) {
      return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, admin: { id: admin.id, username: admin.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
export async function getAdminDetail(adminId) {
  const query = `
    SELECT 
      a.id AS admin_id,
      a.username,
      p.full_name,
      p.email,
      p.phone,
      p.address,
      p.avatar_url,
      p.created_at,
      p.gender,
      p.religion,
      p.birth_date,
      p.position,
      co.objective AS career_objective,
      
      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'position', we.position,
          'company', we.company,
          'start_year', we.start_year,
          'end_year', we.end_year,
          'description', we.description
        ))
        FROM admin_work_experience we
        WHERE we.admin_id = a.id
      ), '[]'::json) AS work_experience,

      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'school', ed.school,
          'major', ed.major,
          'start_year', ed.start_year,
          'end_year', ed.end_year,
          'achievement', ed.achievement
        ))
        FROM admin_education ed
        WHERE ed.admin_id = a.id
      ), '[]'::json) AS education,

      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'skill_name', sk.skill_name,
          'level', sk.level
        ))
        FROM admin_skill sk
        WHERE sk.admin_id = a.id
      ), '[]'::json) AS skills,

      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'year', aw.year,
          'title', aw.title,
          'description', aw.description
        ))
        FROM admin_award aw
        WHERE aw.admin_id = a.id
      ), '[]'::json) AS awards,

      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'year', ce.year,
          'name', ce.name,
          'organization', ce.organization
        ))
        FROM admin_certificate ce
        WHERE ce.admin_id = a.id
      ), '[]'::json) AS certificates,

      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'year', pr.year,
          'title', pr.title,
          'description', pr.description
        ))
        FROM admin_project pr
        WHERE pr.admin_id = a.id
      ), '[]'::json) AS projects,

      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'year_start', ac.year_start,
          'year_end', ac.year_end,
          'title', ac.title,
          'description', ac.description
        ))
        FROM admin_activity ac
        WHERE ac.admin_id = a.id
      ), '[]'::json) AS activities,

      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'name', rf.name,
          'position', rf.position,
          'company', rf.company,
          'phone', rf.phone,
          'email', rf.email
        ))
        FROM admin_reference rf
        WHERE rf.admin_id = a.id
      ), '[]'::json) AS references,

      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'hobby_name', hb.hobby_name
        ))
        FROM admin_hobby hb
        WHERE hb.admin_id = a.id
      ), '[]'::json) AS hobbies

    FROM admin a
    LEFT JOIN admin_profile p ON p.admin_id = a.id
    LEFT JOIN admin_career_objective co ON co.admin_id = a.id
    WHERE a.id = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [adminId]);
  return result.rows[0] || null;
}




export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id; // lấy từ middleware verifyToken

    const result = await pool.query(
      `
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
        p.background_url,
        P.religion,
        p.created_at,
        co.objective AS career_objective,

        -- Kinh nghiệm làm việc
        COALESCE((
          SELECT json_agg(json_build_object(
            'position', position,
            'company', company,
            'start_year', start_year,
            'end_year', end_year,
            'description', description
          ))
          FROM work_experience
          WHERE owner_type = 'admin' AND owner_id = a.id
        ), '[]'::json) AS work_experience,

        -- Học vấn
        COALESCE((
          SELECT json_agg(json_build_object(
            'school', school,
            'major', major,
            'start_year', start_year,
            'end_year', end_year
          ))
          FROM education
          WHERE owner_type = 'admin' AND owner_id = a.id
        ), '[]'::json) AS education,

        -- Kỹ năng
        COALESCE((
          SELECT json_agg(json_build_object(
            'skill_name', skill_name,
            'level', level
          ))
          FROM skill
          WHERE owner_type = 'admin' AND owner_id = a.id
        ), '[]'::json) AS skills,

        -- Dự án
        COALESCE((
          SELECT json_agg(json_build_object(
            'title', title,
            'year', year,
            'description', description
          ))
          FROM project
          WHERE owner_type = 'admin' AND owner_id = a.id
        ), '[]'::json) AS projects

      FROM admin a
      LEFT JOIN profile p ON p.owner_type = 'admin' AND p.owner_id = a.id
      LEFT JOIN career_objective co ON co.owner_type = 'admin' AND co.owner_id = a.id
      WHERE a.id = $1
      LIMIT 1;
      `,
      [adminId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy hồ sơ admin" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Lỗi truy vấn profile:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy hồ sơ" });
  }
};


// PUT /api/admin/profile
export const updateAdminProfile = async (req, res) => {
  const adminId = req.user.id; // từ middleware verifyToken
  const {
    full_name,
    email,
    phone,
    address,
    gender,
    birth_date,
    position,
    avatar_url,
    background_url,
    career_objective,
    work_experience,
    education,
    skills,
  } = req.body.profile; // gửi toàn bộ profile từ frontend

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1️⃣ Cập nhật profile chính
    await client.query(
      `
      INSERT INTO profile (owner_type, owner_id, full_name, email, phone, address, gender, birth_date, position, avatar_url, background_url)
      VALUES ('admin', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (owner_type, owner_id) 
      DO UPDATE SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        address = EXCLUDED.address,
        gender = EXCLUDED.gender,
        birth_date = EXCLUDED.birth_date,
        position = EXCLUDED.position,
        avatar_url = EXCLUDED.avatar_url,
        background_url = EXCLUDED.background_url
      `,
      [
        adminId,
        full_name,
        email,
        phone,
        address,
        gender,
        birth_date,
        position,
        avatar_url,
        background_url,
      ]
    );

    // 2️⃣ Cập nhật career objective
    await client.query(
      `
      INSERT INTO career_objective (owner_type, owner_id, objective)
      VALUES ('admin', $1, $2)
      ON CONFLICT (owner_type, owner_id) 
      DO UPDATE SET objective = EXCLUDED.objective
      `,
      [adminId, career_objective]
    );

    // 3️⃣ Xóa và insert work_experience
    if (Array.isArray(work_experience)) {
      await client.query("DELETE FROM work_experience WHERE owner_type='admin' AND owner_id=$1", [adminId]);
      for (const w of work_experience) {
        await client.query(
          `INSERT INTO work_experience (owner_type, owner_id, position, company, start_year, end_year, description)
           VALUES ('admin', $1, $2, $3, $4, $5, $6)`,
          [adminId, w.position, w.company, w.start_year, w.end_year, w.description]
        );
      }
    }

    // 4️⃣ Xóa và insert education
    if (Array.isArray(education)) {
      await client.query("DELETE FROM education WHERE owner_type='admin' AND owner_id=$1", [adminId]);
      for (const ed of education) {
        await client.query(
          `INSERT INTO education (owner_type, owner_id, school, major, start_year, end_year, achievement)
           VALUES ('admin', $1, $2, $3, $4, $5, $6)`,
          [adminId, ed.school, ed.major, ed.start_year, ed.end_year, ed.achievement]
        );
      }
    }

    // 5️⃣ Xóa và insert skills
    if (Array.isArray(skills)) {
      await client.query("DELETE FROM skill WHERE owner_type='admin' AND owner_id=$1", [adminId]);
      for (const s of skills) {
        await client.query(
          `INSERT INTO skill (owner_type, owner_id, skill_name, level)
           VALUES ('admin', $1, $2, $3)`,
          [adminId, s.skill_name, s.level]
        );
      }
    }

    await client.query("COMMIT");
    res.json({ message: "Cập nhật hồ sơ thành công" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Lỗi cập nhật profile:", err);
    res.status(500).json({ message: "Cập nhật hồ sơ thất bại" });
  } finally {
    client.release();
  }
};
