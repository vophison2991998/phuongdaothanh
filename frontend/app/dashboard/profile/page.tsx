"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Separator } from "../../components/ui/separator";
import { motion } from "framer-motion";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<any>(null);
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
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-indigo-600 text-lg font-medium animate-pulse">
          Đang tải thông tin hồ sơ...
        </div>
      </div>
    );

  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-500 text-lg">Không tìm thấy dữ liệu hồ sơ.</div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-10 px-4"
    >
      <Card className="max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border border-indigo-100 bg-white/80 backdrop-blur-md">
        {/* Header */}
        <CardHeader className="flex flex-col items-center gap-4 py-8 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white relative">
          <div className="absolute top-0 left-0 w-full h-full bg-indigo-600/40 blur-3xl -z-10" />
          <Avatar className="w-32 h-32 border-4 border-white shadow-md">
            <AvatarImage src={profile.avatar_url || "/default-avatar.png"} alt={profile.full_name} />
            <AvatarFallback>{profile.full_name?.[0] || "A"}</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {profile.full_name}
            </CardTitle>
            <p className="text-indigo-100 text-sm">{profile.position || "Chưa cập nhật chức vụ"}</p>
          </div>

          <Badge
            variant="secondary"
            className="bg-white/20 border border-white/30 text-white px-4 py-1 mt-2 backdrop-blur-sm"
          >
            @{profile.username}
          </Badge>
        </CardHeader>

        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Thông tin cá nhân */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-semibold text-indigo-700 text-lg mb-3 border-l-4 border-indigo-500 pl-3">
                Thông tin cá nhân
              </h2>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li><strong>Email:</strong> {profile.email || "—"}</li>
                <li><strong>Điện thoại:</strong> {profile.phone || "—"}</li>
                <li><strong>Địa chỉ:</strong> {profile.address || "—"}</li>
                <li><strong>Giới tính:</strong> {profile.gender || "—"}</li>
                <li><strong>Ngày sinh:</strong>{" "}
                  {profile.birth_date ? new Date(profile.birth_date).toLocaleDateString() : "—"}
                </li>
              </ul>
            </motion.div>

            {/* Mục tiêu & Tiến độ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-semibold text-indigo-700 text-lg mb-3 border-l-4 border-indigo-500 pl-3">
                Mục tiêu nghề nghiệp
              </h2>
              <p className="text-gray-700 leading-relaxed bg-indigo-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
                {profile.career_objective || "Chưa cập nhật mục tiêu nghề nghiệp."}
              </p>




              <div className="mt-6">
                <h3 className="font-semibold text-indigo-700 text-lg mb-2 border-l-4 border-indigo-500 pl-3">
                  Tiến độ hồ sơ
                </h3>
                <Progress value={80} className="w-full" />
                <p className="text-xs text-gray-500 mt-1">Đã hoàn thiện 80%</p>
              </div>
            </motion.div>
          </div>

          <Separator className="my-8" />

          {/* Nút hành động */}
          <div className="flex justify-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-xl shadow transition-all duration-300">
              Cập nhật hồ sơ
            </button>
            <button className="bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-medium px-6 py-2 rounded-xl shadow transition-all duration-300">
              Đăng xuất
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
