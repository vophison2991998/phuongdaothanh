"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {Card, CardHeader, CardTitle, CardContent,} from "../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { AdminProfile, WorkExperience, Education, Skill } from "../../types/adminProfile";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editSection, setEditSection] = useState<string | null>(null); // ✅ theo dõi section nào đang chỉnh sửa
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

  const handleSave = (field: string, value: any) => {
    setProfile((prev) => prev && { ...prev, [field]: value });
    setEditSection(null); // đóng chế độ chỉnh sửa
  };

  if (loading)
    return <div className="p-6 text-center text-gray-500">Đang tải...</div>;
  if (!profile)
    return (
      <div className="p-6 text-center text-red-500">Không thể tải dữ liệu.</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-6 md:p-10"
    >
      <Card className="max-w-5xl mx-auto shadow-lg rounded-2xl border border-gray-200 bg-white">
        {/* HEADER */}
       <CardHeader className="flex flex-col items-center text-center py-8 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl relative">
  {/* Hình nền */}
  <div
    className="absolute inset-0 rounded-t-2xl bg-cover bg-center opacity-30"
    style={{
      backgroundImage: `url(${profile.background_url || "/default-bg.jpg"})`,
    }}
  ></div>

  {/* Avatar */}
  <Avatar className="w-24 h-24 border-4 border-white shadow-lg relative z-10">
    <AvatarImage src={profile.avatar_url || "/default-avatar.png"} />
    <AvatarFallback>{profile.full_name?.[0] || "A"}</AvatarFallback>
  </Avatar>

  <div className="mt-3 relative z-10">
    <CardTitle className="text-2xl font-bold">{profile.full_name}</CardTitle>
    <p className="text-blue-100 text-sm">
      {profile.position || "Chưa cập nhật chức vụ"}
    </p>
    <Badge
      variant="secondary"
      className="mt-3 bg-white/20 text-white px-3 py-1"
    >
      @{profile.username}
    </Badge>

    {/* Nút chỉnh sửa avatar + hình nền */}
    <div className="flex gap-2 justify-center mt-4">
      {/* Chỉnh sửa Avatar */}
      <div className="relative">
        <Button
          size="sm"
          variant="secondary"
          className="bg-white/80 text-blue-700 hover:bg-white"
          onClick={() => document.getElementById("upload-avatar")?.click()}
        >
          🖼️ Đổi Avatar
        </Button>
        <input
          id="upload-avatar"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setProfile((prev) => ({ ...prev!, avatar_url: imageUrl }));
            }
          }}
        />
      </div>

      {/* Chỉnh sửa Hình nền */}
      <div className="relative">
        <Button
          size="sm"
          variant="outline"
          className="bg-white/60 text-blue-800 hover:bg-white"
          onClick={() => document.getElementById("upload-bg")?.click()}
        >
          🌄 Đổi Hình nền
        </Button>
        <input
          id="upload-bg"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setProfile((prev) => ({ ...prev!, background_url: imageUrl }));
            }
          }}
        />
      </div>
    </div>
  </div>
</CardHeader>


        {/* CONTENT */}
        <CardContent className="p-8 space-y-8">
          {/* 1. Thông tin cá nhân */}
          <Section
            title="1. Thông tin cá nhân"
            editing={editSection === "info"}
            onEdit={() => setEditSection("info")}
            onSave={() => handleSave("info", profile)}
          >
            {editSection === "info" ? (
              <Grid>
                <EditableField label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
                <EditableField label="Điện thoại" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
                <EditableField label="Địa chỉ" value={profile.address} onChange={(v) => setProfile({ ...profile, address: v })} />
                <EditableField label="Giới tính" value={profile.gender} onChange={(v) => setProfile({ ...profile, gender: v })} />
              </Grid>
            ) : (
              <Grid>
                <Info label="Email" value={profile.email} />
                <Info label="Điện thoại" value={profile.phone} />
                <Info label="Địa chỉ" value={profile.address} />
                <Info label="Giới tính" value={profile.gender} />
              </Grid>
            )}
          </Section>

          {/* 2. Mục tiêu nghề nghiệp */}
          <Section
            title="2. Mục tiêu nghề nghiệp"
            editing={editSection === "career"}
            onEdit={() => setEditSection("career")}
            onSave={() => handleSave("career_objective", profile.career_objective)}
          >
            {editSection === "career" ? (
              <textarea
                className="w-full p-3 border rounded-lg"
                value={profile.career_objective || ""}
                onChange={(e) =>
                  setProfile({ ...profile, career_objective: e.target.value })
                }
              />
            ) : (
              <TextBox text={profile.career_objective || "Chưa cập nhật."} />
            )}
          </Section>

      {/* 3. Kinh nghiệm làm việc */}
{/* 3. Kinh nghiệm làm việc */}
<Section
  title="3. Kinh nghiệm làm việc"
  editing={editSection === "work"}
  onEdit={() => setEditSection("work")}
  onSave={() => handleSave("work_experience", profile.work_experience)}
>
  {editSection === "work" ? (
    <div className="space-y-4">
      {profile.work_experience?.map((w, i) => (
        <div key={i} className="p-3 border rounded-lg bg-gray-50 space-y-2 relative">
          {/* Nút xóa dòng */}
          <button
            onClick={() => {
              const updated = profile.work_experience.filter((_, idx) => idx !== i);
              setProfile({ ...profile, work_experience: updated });
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          <EditableField
            label="Vị trí"
            value={w.position}
            onChange={(v) => {
              const updated = [...(profile.work_experience || [])];
              updated[i].position = v;
              setProfile({ ...profile, work_experience: updated });
            }}
          />
          <EditableField
            label="Công ty"
            value={w.company}
            onChange={(v) => {
              const updated = [...(profile.work_experience || [])];
              updated[i].company = v;
              setProfile({ ...profile, work_experience: updated });
            }}
          />
          <div className="grid grid-cols-2 gap-2">
            <EditableField
              label="Năm bắt đầu"
              value={w.start_year}
              onChange={(v) => {
                const updated = [...(profile.work_experience || [])];
                updated[i].start_year = v;
                setProfile({ ...profile, work_experience: updated });
              }}
            />
            <EditableField
              label="Năm kết thúc"
              value={w.end_year || ""}
              onChange={(v) => {
                const updated = [...(profile.work_experience || [])];
                updated[i].end_year = v;
                setProfile({ ...profile, work_experience: updated });
              }}
            />
          </div>
          <EditableField
            label="Mô tả công việc"
            value={w.description}
            onChange={(v) => {
              const updated = [...(profile.work_experience || [])];
              updated[i].description = v;
              setProfile({ ...profile, work_experience: updated });
            }}
          />
        </div>
      ))}

      {/* Nút thêm dòng mới */}
      <button
        onClick={() =>
          setProfile({
            ...profile,
            work_experience: [
              ...(profile.work_experience || []),
              { position: "", company: "", start_year: "", end_year: "", description: "" },
            ],
          })
        }
        className="w-full p-2 border border-dashed rounded-lg text-blue-600 hover:bg-blue-50"
      >
        + Thêm kinh nghiệm
      </button>
    </div>
  ) : (
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
  )}
</Section>

{/* 4. Học vấn */}
<Section
  title="4. Trình độ học vấn"
  editing={editSection === "edu"}
  onEdit={() => setEditSection("edu")}
  onSave={() => handleSave("education", profile.education)}
>
  {editSection === "edu" ? (
    <div className="space-y-4">
      {profile.education?.map((ed, i) => (
        <div key={i} className="p-3 border rounded-lg bg-gray-50 space-y-2 relative">
          {/* Nút xóa dòng */}
          <button
            onClick={() => {
              const updated = profile.education.filter((_, idx) => idx !== i);
              setProfile({ ...profile, education: updated });
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          <EditableField
            label="Trường học"
            value={ed.school}
            onChange={(v) => {
              const updated = [...(profile.education || [])];
              updated[i].school = v;
              setProfile({ ...profile, education: updated });
            }}
          />
          <EditableField
            label="Chuyên ngành"
            value={ed.major}
            onChange={(v) => {
              const updated = [...(profile.education || [])];
              updated[i].major = v;
              setProfile({ ...profile, education: updated });
            }}
          />
          <div className="grid grid-cols-2 gap-2">
            <EditableField
              label="Năm bắt đầu"
              value={ed.start_year}
              onChange={(v) => {
                const updated = [...(profile.education || [])];
                updated[i].start_year = v;
                setProfile({ ...profile, education: updated });
              }}
            />
            <EditableField
              label="Năm kết thúc"
              value={ed.end_year}
              onChange={(v) => {
                const updated = [...(profile.education || [])];
                updated[i].end_year = v;
                setProfile({ ...profile, education: updated });
              }}
            />
          </div>
          <EditableField
            label="Thành tích"
            value={ed.achievement}
            onChange={(v) => {
              const updated = [...(profile.education || [])];
              updated[i].achievement = v;
              setProfile({ ...profile, education: updated });
            }}
          />
        </div>
      ))}

      {/* Nút thêm dòng mới */}
      <button
        onClick={() =>
          setProfile({
            ...profile,
            education: [
              ...(profile.education || []),
              { school: "", major: "", start_year: "", end_year: "", achievement: "" },
            ],
          })
        }
        className="w-full p-2 border border-dashed rounded-lg text-blue-600 hover:bg-blue-50"
      >
        + Thêm học vấn
      </button>
    </div>
  ) : (
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
  )}
</Section>

{/* 5. Kỹ năng */}
<Section
  title="5. Kỹ năng"
  editing={editSection === "skills"}
  onEdit={() => setEditSection("skills")}
  onSave={() => handleSave("skills", profile.skills)}
>
  {editSection === "skills" ? (
    <div className="space-y-4">
      {profile.skills?.map((s, i) => (
        <div key={i} className="p-3 border rounded-lg bg-gray-50 space-y-2 relative">
          {/* Nút xóa dòng */}
          <button
            onClick={() => {
              const updated = profile.skills.filter((_, idx) => idx !== i);
              setProfile({ ...profile, skills: updated });
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          <EditableField
            label="Tên kỹ năng"
            value={s.skill_name}
            onChange={(v) => {
              const updated = [...(profile.skills || [])];
              updated[i].skill_name = v;
              setProfile({ ...profile, skills: updated });
            }}
          />
          <EditableField
            label="Trình độ"
            value={s.level}
            onChange={(v) => {
              const updated = [...(profile.skills || [])];
              updated[i].level = v;
              setProfile({ ...profile, skills: updated });
            }}
          />
        </div>
      ))}

      {/* Nút thêm dòng mới */}
      <button
        onClick={() =>
          setProfile({
            ...profile,
            skills: [...(profile.skills || []), { skill_name: "", level: "" }],
          })
        }
        className="w-full p-2 border border-dashed rounded-lg text-blue-600 hover:bg-blue-50"
      >
        + Thêm kỹ năng
      </button>
    </div>
  ) : (
    <div className="flex flex-wrap gap-2">
      {profile.skills?.length
        ? profile.skills.map((s, i) => (
            <Badge key={i} className="px-3 py-1 bg-blue-100 text-blue-700">
              {s.skill_name} ({s.level})
            </Badge>
          ))
        : "Chưa có kỹ năng."}
    </div>
  )}
</Section>



          {/* 6. Tiến độ */}
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

/* ===== COMPONENT PHỤ ===== */
const Section = ({
  title,
  editing,
  onEdit,
  onSave,
  children,
}: {
  title: string;
  editing?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  children: React.ReactNode;
}) => (
  <section className="relative">
    <div className="flex justify-between items-center mb-3">
      <h2 className="font-semibold text-blue-700 text-lg border-b pb-1">
        {title}
      </h2>
      {onEdit &&
        (editing ? (
          <Button
            size="sm"
            variant="secondary"
            className="text-green-700 bg-green-100 hover:bg-green-200"
            onClick={onSave}
          >
            💾 Lưu
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
            onClick={onEdit}
          >
            ✏️ Sửa
          </Button>
        ))}
    </div>
    {children}
  </section>
);

const Info = ({ label, value }: { label: string; value?: string }) => (
  <p>
    <b>{label}:</b> {value || "—"}
  </p>
);

const EditableField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      className="w-full border p-2 rounded-md"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid md:grid-cols-2 gap-4 text-gray-700">{children}</div>
);

const TextBox = ({ text }: { text: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700">
    {text}
  </div>
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
