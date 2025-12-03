"use client";

import "./globals.css";
import { ReactNode } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import { usePathname } from "next/navigation";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="vi">
      <body>
        {isLoginPage ? (
          // Nếu đang ở /login → render bình thường
          children
        ) : (
          // Tất cả page dashboard → bọc ProtectedRoute + Layout
          <ProtectedRoute allowedRoles={["admin", "manager", "user"]}>
            <Layout role="user">{children}</Layout>
          </ProtectedRoute>
        )}
      </body>
    </html>
  );
}
