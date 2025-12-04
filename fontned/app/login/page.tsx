"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Đăng nhập thất bại!");
        setLoading(false);
        return;
      }

      // ★ LƯU COOKIE CHUẨN THEO BACKEND
      Cookies.set("token", data.token);
      Cookies.set("username", data.user.username);
      Cookies.set("role", data.user.role);
      Cookies.set("userId", data.user.id);

      // ★ ĐIỀU HƯỚNG THEO ROLE
      switch (data.user.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "manager":
          router.push("/manager/dashboard");
          break;
        case "user":
          router.push("/user/dashboard");
          break;
        default:
          router.push("/dashboard"); // fallback
          break;
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError("Không thể kết nối máy chủ!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">

      {/* Hiệu ứng nền */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-24 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob delay-2000"></div>
      <div className="absolute bottom-0 left-12 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob delay-4000"></div>

      <div className="relative w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg p-8 animate-fadeInUp">

        <div className="flex flex-col items-center mb-6">
          <img src="/government-logo.png" alt="Logo Cơ quan" className="w-20 h-20 mb-3" />
          <h1 className="text-2xl font-semibold text-gray-800">Hệ thống quản lý nội bộ</h1>
          <p className="text-sm text-gray-600">Đăng nhập để tiếp tục</p>
        </div>

        {error && <p className="text-red-600 text-center mb-4 animate-shake">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 hover:scale-105 transition"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-400 hover:scale-105 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-md font-semibold hover:scale-105 transition"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-4">© 2025 Cơ quan Nhà nước</p>

      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        .animate-blob { animation: blob 6s infinite; }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease forwards; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake { animation: shake 0.4s; }
      `}</style>

    </div>
  );
}
