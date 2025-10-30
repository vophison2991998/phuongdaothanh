"use client";
import React from "react";

export default function ProfilePage() {
  // Dữ liệu mẫu (sau này có thể fetch từ API)
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0909123456",
    position: "Nhân viên",
    department: "Phòng Kinh doanh"
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Thông tin cá nhân</h2>

      <div className="bg-white shadow-md rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-600">Họ và tên</h3>
          <p className="mt-1 text-gray-800">{user.name}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-600">Email</h3>
          <p className="mt-1 text-gray-800">{user.email}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-600">Số điện thoại</h3>
          <p className="mt-1 text-gray-800">{user.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-600">Chức vụ</h3>
          <p className="mt-1 text-gray-800">{user.position}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-600">Phòng ban</h3>
          <p className="mt-1 text-gray-800">{user.department}</p>
        </div>
      </div>

      {/* Nút chỉnh sửa thông tin */}
      <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
        Chỉnh sửa thông tin
      </button>
    </div>
  );
}
