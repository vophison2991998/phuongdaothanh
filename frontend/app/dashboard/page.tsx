"use client";
import React from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-blue-400">
          <h3 className="font-semibold text-gray-600">Số lượng nhân viên</h3>
          <p className="mt-2 text-gray-800 font-bold text-2xl">120</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-green-400">
          <h3 className="font-semibold text-gray-600">Khóa học đang diễn ra</h3>
          <p className="mt-2 text-gray-800 font-bold text-2xl">8</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-purple-400">
          <h3 className="font-semibold text-gray-600">Nhân viên nghỉ việc</h3>
          <p className="mt-2 text-gray-800 font-bold text-2xl">3</p>
        </motion.div>
      </div>
    </div>
  );
}
