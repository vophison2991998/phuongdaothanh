"use client"; // Bắt buộc phải có nếu dùng Client Component bên trong

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PageTransition from "./PageTransition";

interface Props {
  children: ReactNode;
  role: "admin" | "manager" | "user";
}

export default function Layout({ children, role }: Props) {
  return (
    <PageTransition>
      <div
        className={`flex min-h-screen ${
          role === "admin"
            ? "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200"
            : role === "manager"
            ? "bg-gradient-to-r from-green-50 via-green-100 to-green-200"
            : "bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200"
        }`}
      >
        <Sidebar role={role} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </PageTransition>
  );
}
