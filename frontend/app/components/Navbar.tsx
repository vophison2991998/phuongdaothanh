"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <header className="fixed top-0 left-[300px] right-0 h-[100px] bg-white shadow-md flex justify-between items-center px-6">
      <h1 className="text-3xl font-bold text-gray-700">{title}</h1>
      <FaUserCircle className="text-6xl text-blue-500" />
    </header>
  );
}
