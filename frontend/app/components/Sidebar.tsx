"use client";
import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { FaUser, FaFileContract, FaClipboardList, FaGraduationCap, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ✅ thêm dòng này

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
    logout: () => void; // ✅ thêm dòng này

}

export default function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const router = useRouter();
  const { logout } = useAuth(); // ✅ gọi hàm logout từ context

  const menuItems = [
    { id: "home", label: "Trang chủ", icon: <FaUser />, path: "/" },
    { id: "profile", label: "Thông tin cá nhân", icon: <FaUser />, path: "/dashboard/profile" },
    { id: "createUser", label: "Tạo tài khoản người dùng", icon: <FaFileContract />, path: "/dashboard/create-user" },
    { id: "leaders", label: "Thông tin lãnh đạo", icon: <FaClipboardList />, path: "/dashboard/leaders" },
    {
      id: "statistics",
      label: "Thống kê",
      icon: <FaGraduationCap />,
      submenu: [
        { id: "invoice", label: "Hóa đơn", path: "/dashboard/statistics/invoice" },
        { id: "water", label: "Thống kê nước uống", path: "/dashboard/statistics/water" }
      ]
    },
  ];

  const handleClick = (item: any) => {
    setActiveMenu(item.id);
    if (item.path) router.push(item.path);
  };

  return (
    <aside className="fixed top-0 left-0 w-[300px] h-screen bg-white shadow-lg flex flex-col p-5">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">HR Dashboard</h2>
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {menuItems.map(item => (
          <div key={item.id}>
            <motion.button
              onClick={() => handleClick(item)}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                activeMenu === item.id ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {item.icon} {item.label}
            </motion.button>

            {item.submenu && activeMenu === item.id && (
              <div className="ml-6 flex flex-col gap-1 mt-1">
                {item.submenu.map(sub => (
                  <motion.button
                    key={sub.id}
                    onClick={() => handleClick(sub)}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left text-sm transition ${
                      activeMenu === sub.id ? "bg-blue-200 font-semibold" : "hover:bg-gray-100"
                    }`}
                  >
                    {sub.label}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* ✅ Nút đăng xuất hoạt động */}
      <button
        onClick={logout}
        className="mt-auto flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
      >
        <FaSignOutAlt /> Đăng xuất
      </button>
    </aside>
  );
}
