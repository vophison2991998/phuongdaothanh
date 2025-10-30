"use client";
import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number | string;
  color: string;
}

const StatCard = ({ title, value, color }: StatCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className={`bg-white shadow-md rounded-2xl p-6 border-l-4 ${color} cursor-pointer transition-transform duration-300`}
  >
    <h3 className="font-semibold text-gray-600">{title}</h3>
    <p className="mt-2 text-gray-800 font-bold text-2xl">{value}</p>
  </motion.div>
);

export default function DashboardPage() {
  const stats = [
    { title: "Số lượng nhân viên", value: 120, color: "border-blue-400" },
    { title: "Khóa học đang diễn ra", value: 8, color: "border-green-400" },
    { title: "Nhân viên nghỉ việc", value: 3, color: "border-purple-400" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>
    </div>
  );
}
