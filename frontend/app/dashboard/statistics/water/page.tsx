"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface WaterRecord {
  id: number;
  type: string;
  department: string;
  quantity: number;
  date: string;
  price: number;
  action: "receive" | "return";
}

export default function WaterStatisticsPage() {
  const [records, setRecords] = useState<WaterRecord[]>([]);
  const [currentAction, setCurrentAction] = useState<"receive" | "return" | null>(null);

  const [newRecord, setNewRecord] = useState({
    type: "",
    department: "",
    quantity: 0,
    date: new Date().toISOString().slice(0, 10),
    price: 0,
  });

  const addRecord = () => {
    if (!newRecord.type || !newRecord.department) return;
    const id = records.length ? records[records.length - 1].id + 1 : 1;
    setRecords([
      ...records,
      { ...newRecord, id, action: currentAction! },
    ]);
    setNewRecord({
      type: "",
      department: "",
      quantity: 0,
      date: new Date().toISOString().slice(0, 10),
      price: 0,
    });
  };

  const updateRecord = (id: number, field: string, value: any) => {
    setRecords(
      records.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex space-x-6 p-6">
      {/* Bảng thống kê */}
      <div className="flex-1 bg-white shadow-md rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Thống kê nước theo tháng</h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Loại nước</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phòng ban</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Số tiền</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map(r => (
              <tr key={r.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">{r.id}</td>
                <td className="px-4 py-2">{r.type}</td>
                <td className="px-4 py-2">{r.department}</td>
                <td className="px-4 py-2">{r.quantity}</td>
                <td className="px-4 py-2">{r.date}</td>
                <td className="px-4 py-2">{r.price}</td>
                <td className="px-4 py-2">{r.action === "receive" ? "Nhận" : "Trả"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form thêm mới khi chọn nhận/trả */}
        {currentAction && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">
              {currentAction === "receive" ? "Nhập nước nhận" : "Nhập nước trả"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Loại nước"
                className="border p-2 rounded"
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phòng ban"
                className="border p-2 rounded"
                value={newRecord.department}
                onChange={(e) => setNewRecord({ ...newRecord, department: e.target.value })}
              />
              <input
                type="number"
                placeholder="Số lượng"
                className="border p-2 rounded"
                value={newRecord.quantity}
                onChange={(e) => setNewRecord({ ...newRecord, quantity: Number(e.target.value) })}
              />
              <input
                type="date"
                className="border p-2 rounded"
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
              />
              <input
                type="number"
                placeholder="Số tiền"
                className="border p-2 rounded"
                value={newRecord.price}
                onChange={(e) => setNewRecord({ ...newRecord, price: Number(e.target.value) })}
              />
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                onClick={addRecord}
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Thanh nút chức năng bên phải */}
      <div className="w-48 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={() => setCurrentAction("receive")}
        >
          Nhận nước
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          onClick={() => setCurrentAction("return")}
        >
          Trả nước
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={handlePrint}
        >
          In danh sách
        </motion.button>
      </div>
    </div>
  );
}
