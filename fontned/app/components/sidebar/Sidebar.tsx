"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface DecodedToken {
  id: number;
  username: string;
  role: "admin" | "manager" | "user";
}

import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";

export default function Sidebar() {
  const [role, setRole] = useState<"admin" | "manager" | "user" | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setRole(decoded.role);
      } catch (e) {
        console.error("Token decode error:", e);
      }
    }
  }, []);

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 space-y-3">

      <div className="font-bold text-xl mb-4">Dashboard</div>

      {/* Menu chung */}
      <SidebarItem href="/dashboard">Trang chủ</SidebarItem>

      {/* Admin mới thấy */}
      {role === "admin" && (
        <SidebarGroup label="Quản trị">
          <SidebarItem href="/dashboard/users">Quản lý Users</SidebarItem>
          <SidebarItem href="/dashboard/roles">Phân quyền</SidebarItem>
        </SidebarGroup>
      )}

      {/* Manager */}
      {(role === "admin" || role === "manager") && (
        <SidebarGroup label="Nhân sự">
          <SidebarItem href="/dashboard/employees">Nhân viên</SidebarItem>
          <SidebarItem href="/dashboard/attendance">Chấm công</SidebarItem>
        </SidebarGroup>
      )}

      {/* User */}
      {role === "user" && (
        <SidebarGroup label="Tài khoản">
          <SidebarItem href="/dashboard/profile">Hồ sơ</SidebarItem>
        </SidebarGroup>
      )}
    </aside>
  );
}
