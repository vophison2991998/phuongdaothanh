"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
    >
      {/* Vòng tròn quay */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-blue-200 rounded-full animate-spin mb-4"></div>

      {/* Thông báo */}
      <p className="text-gray-700 font-medium text-lg">Đang chuyển hướng...</p>
    </motion.div>
  );
}
  