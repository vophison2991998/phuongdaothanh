"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Separator } from "../../components/ui/separator";

interface WorkExperience {
  position: string;
  company: string;
  start_year: string;
  end_year?: string;
  description?: string;
}

interface Education {
  school: string;
  major: string;
  start_year: string;
  end_year: string;
  achievement?: string;
}

interface Skill {
  skill_name: string;
  level: string;
}

interface AdminProfile {
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
  career_objective?: string;
  work_experience?: WorkExperience[];
  education?: Education[];
  skills?: Skill[];
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return <div className="p-6 text-center text-gray-500">Đang tải...</div>;
  if (!profile)
    return <div className="p-6 text-center text-red-500">Không thể tải dữ liệu.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-6 md:p-10"
    >
      <Card className="max-w-5xl mx-auto shadow-lg rounded-2xl border border-gray-200 bg-white">
        {/* HEADER */}
        <CardHeader className="flex flex-col items-center text-center py-8 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src={profile.avatar_url || "/default-avatar.png"} />
            <AvatarFallback>{profile.full_name?.[0] || "A"}</AvatarFallback>
          </Avatar>
          <div className="mt-3">
            <CardTitle className="text-2xl font-bold">{profile.full_name}</CardTitle>
            <p className="text-blue-100 text-sm">{profile.position || "Chưa cập nhật chức vụ"}</p>
            <Badge variant="secondary" className="mt-3 bg-white/20 text-white px-3 py-1">
              @{profile.username}
            </Badge>
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="p-8 space-y-8">
          <Section title="1. Thông tin cá nhân">
            <Grid>
              <Info label="Mã quản trị" value={profile.admin_id} />
              <Info label="Email" value={profile.email} />
              <Info label="Điện thoại" value={profile.phone} />
              <Info label="Địa chỉ" value={profile.address} />
              <Info label="Giới tính" value={profile.gender} />
              <Info label="Tôn giáo" value={profile.religion} />
              <Info label="Ngày sinh" value={formatDate(profile.birth_date)} />
              <Info label="Ngày tạo" value={formatDate(profile.created_at)} />
            </Grid>
          </Section>

          <Section title="2. Mục tiêu nghề nghiệp">
            <TextBox text={profile.career_objective || "Chưa cập nhật."} />
          </Section>

          <Section title="3. Kinh nghiệm làm việc">
            <List
              items={profile.work_experience}
              render={(w) => (
                <>
                  <h3 className="font-semibold">{w.position}</h3>
                  <p>{w.company}</p>
                  <small className="text-gray-500">
                    {w.start_year} - {w.end_year || "Hiện tại"}
                  </small>
                  <p>{w.description}</p>
                </>
              )}
            />
          </Section>

          <Section title="4. Trình độ học vấn">
            <List
              items={profile.education}
              render={(ed) => (
                <>
                  <h3 className="font-semibold">{ed.school}</h3>
                  <p>{ed.major}</p>
                  <small className="text-gray-500">
                    {ed.start_year} - {ed.end_year}
                  </small>
                  <p>{ed.achievement}</p>
                </>
              )}
            />
          </Section>

          <Section title="5. Kỹ năng">
            <div className="flex flex-wrap gap-2">
              {profile.skills?.length
                ? profile.skills.map((s, i) => (
                    <Badge key={i} className="px-3 py-1 bg-blue-100 text-blue-700">
                      {s.skill_name} ({s.level})
                    </Badge>
                  ))
                : "Chưa có kỹ năng."}
            </div>
          </Section>

          <Section title="6. Tiến độ hồ sơ">
            <Progress value={100} />
            <p className="text-xs text-gray-500 mt-1">Đã hoàn thiện 100%</p>
          </Section>

          <Separator />
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ====== COMPONENT PHỤ ====== */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="font-semibold text-blue-700 mb-3 text-lg border-b pb-1">{title}</h2>
    {children}
  </section>
);

const Info = ({ label, value }: { label: string; value?: string }) => (
  <p>
    <b>{label}:</b> {value || "—"}
  </p>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid md:grid-cols-2 gap-4 text-gray-700">{children}</div>
);

const TextBox = ({ text }: { text: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700">{text}</div>
);

const List = <T,>({
  items,
  render,
}: {
  items?: T[];
  render: (item: T) => React.ReactNode;
}) =>
  items?.length ? (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100">
          {render(item)}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">Chưa có dữ liệu.</p>
  );

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString("vi-VN") : "—";
