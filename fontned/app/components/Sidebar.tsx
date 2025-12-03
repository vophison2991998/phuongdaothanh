"use client";

import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface Props {
  role?: string;
}

export default function Sidebar({ role }: Props) {
  const roleUser = role || Cookies.get("role") || "";
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Menu theo role
  const menuItems: { [key: string]: any[] } = {
    admin: [
      { name: "Dashboard", href: "/admin/dashboard" },
      { 
        name: "Quản lý người dùng", 
        submenu: [
          { name: "Thêm người dùng", href: "/admin/users/add" },
          { name: "Danh sách", href: "/admin/users/list" },
        ] 
      },
      { name: "Báo cáo", href: "/admin/reports" },
    ],
    manager: [
      { name: "Dashboard", href: "/manager/dashboard" },
      { name: "Dự án", href: "/manager/projects" },
      { name: "Báo cáo", href: "/manager/reports" },
    ],
    user: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Công việc", href: "/dashboard/tasks" },
      { name: "Hồ sơ cá nhân", href: "/dashboard/profile" },
    ],
  };

  const items = menuItems[roleUser] || [];

  return (
    <aside className={`bg-gray-100 min-h-screen p-4 shadow-md transition-all duration-300 ${collapsed ? "w-20" : "w-60"}`}>
      <button
        className="mb-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "→" : "← Thu nhỏ"}
      </button>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                  className="flex items-center justify-between w-full px-4 py-2 rounded-md text-gray-800 hover:bg-blue-200 hover:text-blue-800 transition"
                >
                  {item.name}
                  {openSubmenu === item.name ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5" />
                  )}
                </button>
                {openSubmenu === item.name && !collapsed && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {item.submenu.map((sub: any) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.href}
                          className="block px-4 py-1 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className="block px-4 py-2 rounded-md text-gray-800 hover:bg-blue-200 hover:text-blue-800 transition"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
