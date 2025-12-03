"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const username = Cookies.get("username") || "User";
  const role = Cookies.get("role") || "";

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("role");
    router.push("/login");
  };

  return (
    <nav className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/government-logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
        <span className="font-semibold text-lg">Hệ thống quản lý nội bộ</span>
      </div>

      <div className="flex items-center space-x-4">
        <span>{username} ({role})</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
