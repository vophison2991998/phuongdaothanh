"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  DocumentChartBarIcon,
  FolderIcon,
  UserIcon
} from "@heroicons/react/24/solid";

interface Props {
  role?: string;
}

interface TokenPayload {
  role: "admin" | "manager" | "user";
}

export default function Sidebar({ role }: Props) {
  const [roleUser, setRoleUser] = useState("user");
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // ==========================
  // LẤY ROLE TỪ TOKEN / COOKIE
  // ==========================
  useEffect(() => {
    const token = Cookies.get("token");
    const cookieRole = Cookies.get("role");

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        return setRoleUser(decoded.role);
      } catch {}
    }

    if (cookieRole) return setRoleUser(cookieRole);
    if (role) return setRoleUser(role);
  }, [role]);

  // ==========================
  // ICON CHUNG
  // ==========================
  const icons: any = {
    Dashboard1: <HomeIcon className="w-5 h-5" />,
    Dashboard2: <HomeIcon className="w-5 h-5" />,
    Dashboard3: <HomeIcon className="w-5 h-5" />,
    "Quản lý người dùng": <UserGroupIcon className="w-5 h-5" />,
    "Thêm người dùng": <UserIcon className="w-4 h-4" />,
    "Danh sách": <ClipboardDocumentListIcon className="w-4 h-4" />,
    "Dự án": <FolderIcon className="w-5 h-5" />,
    "Công việc": <ClipboardDocumentListIcon className="w-5 h-5" />,
    "Hồ sơ cá nhân": <UserIcon className="w-5 h-5" />,
    "Báo cáo": <DocumentChartBarIcon className="w-5 h-5" />,
  };

  // ==========================
  // MENU THEO ROLE
  // ==========================
  const menu: any = {
    admin: [
      { name: "Dashboard1", href: "/admin/dashboard" },
      {
        name: "Quản lý người dùng",
        submenu: [
          { name: "Thêm người dùng", href: "/admin/users/add" },
          { name: "Danh sách", href: "/admin/users/list" }
        ]
      },
      { name: "Báo cáo", href: "/admin/reports" }
    ],
    manager: [
      { name: "Dashboard2", href: "/manager/dashboard" },
      { name: "Dự án", href: "/manager/projects" },
      { name: "Báo cáo", href: "/manager/reports" }
    ],
    user: [
      { name: "Dashboard3", href: "/dashboard" },
      { name: "Công việc", href: "/dashboard/tasks" },
      { name: "Hồ sơ cá nhân", href: "/dashboard/profile" }
    ]
  };

  const items = menu[roleUser] || [];

  // ==========================
  // RENDER
  // ==========================
  return (
    <aside
      className={`
        bg-white border-r shadow-sm min-h-screen pt-4 pb-6
        transition-all duration-300 flex flex-col
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
   
      <ul className="space-y-1">
        {items.map((item: any) => (
          <li key={item.name}>
            {/* Có submenu */}
            {item.submenu ? (
              <>
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                  }
                  className={`
                    flex items-center gap-3 w-full px-4 py-2 rounded-md
                    text-gray-700 hover:bg-gray-100 transition
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  {icons[item.name]}
                  {!collapsed && <span className="flex-1">{item.name}</span>}
                  {!collapsed &&
                    (openSubmenu === item.name ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    ))}
                </button>

                {/* Submenu */}
                {!collapsed && openSubmenu === item.name && (
                  <ul className="ml-10 mt-1 border-l pl-3 space-y-1">
                    {item.submenu.map((sub: any) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.href}
                          className="flex items-center gap-2 px-3 py-1 text-sm rounded hover:bg-gray-100 text-gray-600"
                        >
                          {icons[sub.name]}
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              // ITEM bình thường
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-md
                  text-gray-700 hover:bg-gray-100 transition
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                {icons[item.name]}
                {!collapsed && item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
