"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import  Sidebar  from "./Sidebar";
import PageTransition from "./PageTransition";

interface Props {
  children: ReactNode;
  role: "admin" | "manager" | "user";
}

const roleBackgrounds = {
  admin: "bg-gradient-to-br from-blue-50 to-blue-100",
  manager: "bg-gradient-to-br from-green-50 to-green-100",
  user: "bg-gradient-to-br from-yellow-50 to-yellow-100",
};

export default function Layout({ children, role }: Props) {
  return (
    <PageTransition>
      <div className={`flex min-h-screen ${roleBackgrounds[role]}`}>
        {/* Sidebar thu gọn */}
        <Sidebar role={role} />

        <div className="flex-1 flex flex-col">
          {/* Navbar sticky */}
          <div className="sticky top-0 z-30 shadow-sm bg-white/70 backdrop-blur-md">
            <Navbar />
          </div>

          {/* Nội dung chính */}
          <main className="p-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
