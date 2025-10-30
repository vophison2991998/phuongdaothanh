"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const adminId = localStorage.getItem("adminId"); // 👈 Lưu khi login

        if (!token || !adminId) {
          toast.error("⚠️ Bạn chưa đăng nhập!");
          return;
        }

        const res = await fetch(`http://localhost:5000/api/auth/${adminId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Không thể tải thông tin!");
        const data = await res.json();

        setUser(data);
      } catch (err) {
        toast.error("❌ Lỗi khi tải thông tin quản trị viên!");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-teal-600 text-xl">
        ⏳ Đang tải dữ liệu hồ sơ...
      </div>
    );

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-xl">
        ⚠️ Không tìm thấy thông tin quản trị viên!
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 flex flex-col">
      <Toaster position="top-center" richColors />

      <header className="bg-white shadow-md py-4 px-6 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-teal-700">
          🏢 Hồ sơ quản trị viên
        </h1>
      </header>

      <main className="flex-grow container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={user.avatar_url || "/avatar-placeholder.png"}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-teal-500 object-cover shadow-md"
          />

          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {user.full_name}
          </h2>
          <p className="text-gray-500 italic mt-1">{user.position}</p>

          <div className="mt-6 w-full space-y-3 text-sm text-gray-700">
            <Info label="📞 Số điện thoại" value={user.phone} />
            <Info label="📧 Email" value={user.email} />
            <Info label="👤 Giới tính" value={user.gender} />
            <Info label="🎂 Ngày sinh" value={user.birth_date} />
            <Info label="📍 Địa chỉ" value={user.address} />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-10 space-y-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Section title="🎯 Mục tiêu nghề nghiệp">
            <p className="text-gray-700 leading-relaxed">
              {user.career_objective || "Chưa có thông tin"}
            </p>
          </Section>
        </motion.div>
      </main>

      <footer className="bg-white border-t text-center text-gray-500 py-4 text-sm">
        © {new Date().getFullYear()} Quản trị hệ thống. All rights reserved.
      </footer>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="flex flex-col">
      <span className="font-medium mb-1">{label}</span>
      <span className="bg-gray-50 p-2 rounded">{value || "—"}</span>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-teal-700 border-b pb-2 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}
