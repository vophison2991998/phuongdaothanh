"use client";
import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeMenu, setActiveMenu] = useState<string>("profile");
  const { user, logout, loading } = useAuth();

  // Tránh flash khi đang xác thực
  if (loading) return null;

  // Nếu chưa đăng nhập -> chỉ hiển thị trang login
  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-100">{children}</div>;

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Sidebar cố định */}
      <div className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-md border-r border-gray-200 z-40">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} logout={logout} />
      </div>

      {/* Navbar cố định */}
      <div className="flex-1 ml-[280px] flex flex-col">
        <div className="fixed top-0 left-[280px] right-0 h-[80px] bg-white shadow-sm flex items-center px-6 z-30">
          <Navbar title={activeMenu} />
        </div>

        {/* Nội dung chính */}
        <main className="flex-1 overflow-y-auto bg-gray-50 pt-[90px] px-8 pb-8">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
