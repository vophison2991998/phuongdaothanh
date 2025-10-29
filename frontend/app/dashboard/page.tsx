"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Trang chính</h1>
      {profile ? (
        <div className="mt-4">
          <p>Tên: {profile.full_name || "Chưa cập nhật"}</p>
          <p>Email: {profile.email || "Chưa có"}</p>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Đăng xuất
      </button>
    </div>
  );
}
