// ✅ D:/daothanh/frontend/app/types/adminProfile.ts

export interface WorkExperience {
  position: string;
  company: string;
  start_year: string;
  end_year?: string;
  description?: string;
}
export interface CareerObjective {
  text: string;
}
export interface Education {
  school: string;
  major: string;
  start_year: string;
  end_year: string;
  achievement?: string;
}

export interface Skill {
  skill_name: string;
  level: string;
}

export interface AdminProfile {
  admin_id: string;
  full_name: string;
  username: string;
  position?: string;
  email?: string;
  phone?: string;
  address?: string;
  gender?: string;
  religion?: string;
  birth_date?: string;
  created_at?: string;
  avatar_url?: string;
  career_objective: CareerObjective[]; // đổi từ string → mảng
  background_url?: string;

  // ✅ Bỏ dấu ? — để luôn có mảng rỗng mặc định
  work_experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  
  
}
