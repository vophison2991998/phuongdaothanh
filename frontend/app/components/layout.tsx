"use client";
import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeMenu, setActiveMenu] = useState<string>("profile");

  return (
    <div>
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} logout={() => console.log("Logout")} />

      {/* Navbar + content */}
      <div className="ml-[300px]">
        <Navbar title={activeMenu} />
        <main className="pt-[100px] p-6">{children}</main>
      </div>
    </div>
  );
}
