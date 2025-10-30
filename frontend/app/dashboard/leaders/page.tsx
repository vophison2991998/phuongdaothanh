"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// 🧠 Kiểu dữ liệu nhân sự
interface Leader {
  id: number;
  name: string;
  position: string;
  term: string;
  image: string;
  children?: Leader[];
}

// 🎯 Trang chính
export default function LeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Giám đốc",
      term: "2020 - 2025",
      image: "/images/director.jpg",
      children: [
        {
          id: 2,
          name: "Trần Thị B",
          position: "Phó giám đốc 1",
          term: "2021 - 2025",
          image: "/images/vice1.jpg",
          children: [
            {
              id: 4,
              name: "Lê Văn D",
              position: "Trưởng phòng nhân sự",
              term: "2022 - 2025",
              image: "/images/hr.jpg",
            },
            {
              id: 5,
              name: "Phạm Thị E",
              position: "Trưởng phòng kế toán",
              term: "2022 - 2025",
              image: "/images/accounting.jpg",
            },
          ],
        },
        {
          id: 3,
          name: "Hoàng Văn C",
          position: "Phó giám đốc 2",
          term: "2021 - 2025",
          image: "/images/vice2.jpg",
          children: [
            {
              id: 6,
              name: "Ngô Văn F",
              position: "Trưởng phòng kỹ thuật",
              term: "2022 - 2025",
              image: "/images/tech.jpg",
            },
            {
              id: 7,
              name: "Đặng Thị G",
              position: "Trưởng phòng marketing",
              term: "2022 - 2025",
              image: "/images/marketing.jpg",
            },
          ],
        },
      ],
    },
  ]);

  const [modalType, setModalType] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Leader | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    term: "",
    image: "",
  });

  // ⚙️ Mở modal thêm/sửa/xem
  const openModal = (type: "add" | "edit" | "view", leader?: Leader) => {
    setModalType(type);
    setSelected(leader || null);
    setFormData(
      type === "edit" && leader
        ? { name: leader.name, position: leader.position, term: leader.term, image: leader.image }
        : { name: "", position: "", term: "", image: "" }
    );
  };

  // 🧹 Xóa nhân sự
  const handleDelete = (id: number) => {
    const removeNode = (nodes: Leader[]): Leader[] =>
      nodes
        .filter(n => n.id !== id)
        .map(n => ({ ...n, children: n.children ? removeNode(n.children) : [] }));
    setLeaders(removeNode(leaders));
  };

  // 💾 Lưu (thêm hoặc sửa)
  const handleSubmit = () => {
    const newNode: Leader = {
      id: Date.now(),
      name: formData.name,
      position: formData.position,
      term: formData.term,
      image: formData.image || "/images/default-avatar.png",
    };

    const updateTree = (nodes: Leader[]): Leader[] =>
      nodes.map(n => {
        if (modalType === "edit" && selected?.id === n.id) {
          return { ...n, ...formData };
        }
        if (modalType === "add" && selected?.id === n.id) {
          return { ...n, children: [...(n.children || []), newNode] };
        }
        return { ...n, children: n.children ? updateTree(n.children) : [] };
      });

    if (modalType === "add" && !selected) {
      setLeaders([...leaders, newNode]);
    } else {
      setLeaders(updateTree(leaders));
    }
    setModalType(null);
  };

  // 🖼️ Upload hình ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setFormData({ ...formData, image: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 🪴 Render cây
  const renderTree = (node: Leader) => (
    <div key={node.id} className="flex flex-col items-center relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white border rounded-2xl shadow-md p-4 w-[230px] text-center relative"
      >
        <img
          src={node.image}
          alt={node.name}
          onClick={() => openModal("view", node)}
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-400 cursor-pointer"
        />
        <h3 className="mt-3 font-semibold text-gray-800">{node.name}</h3>
        <p className="text-sm text-gray-500">{node.position}</p>
        <p className="text-xs text-gray-400 italic">{node.term}</p>

        <div className="flex justify-center gap-3 mt-3">
          <button
            onClick={() => openModal("add", node)}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            <FaPlus />
          </button>
          <button
            onClick={() => openModal("edit", node)}
            className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(node.id)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <FaTrash />
          </button>
        </div>
      </motion.div>

      {node.children?.length ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
          className="flex justify-between mt-8 gap-10 relative"
        >
          {node.children.map(child => (
            <div key={child.id} className="relative">
              <div className="absolute -top-6 left-1/2 w-px h-6 bg-gray-300"></div>
              {renderTree(child)}
            </div>
          ))}
        </motion.div>
      ) : null}
    </div>
  );

  return (
    <div className="flex flex-col items-center py-10 px-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-10 text-gray-700">🌿 Cơ cấu tổ chức nhân sự</h1>
      <div className="flex justify-center overflow-x-auto">{leaders.map(l => renderTree(l))}</div>

      {/* 🧩 MODALS */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[400px] shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {modalType === "view" && selected ? (
                <div className="text-center">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-28 h-28 mx-auto rounded-full border-4 border-blue-500"
                  />
                  <h2 className="mt-4 text-xl font-semibold">{selected.name}</h2>
                  <p className="text-gray-500">{selected.position}</p>
                  <p className="text-gray-400 italic">{selected.term}</p>
                  <button
                    onClick={() => setModalType(null)}
                    className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Đóng
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold mb-4">
                    {modalType === "edit" ? "Chỉnh sửa nhân sự" : "Thêm nhân sự mới"}
                  </h2>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full border p-2 rounded-lg"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-20 h-20 mx-auto rounded-full object-cover border"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border p-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Chức vụ"
                      value={formData.position}
                      onChange={e => setFormData({ ...formData, position: e.target.value })}
                      className="w-full border p-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Nhiệm kỳ"
                      value={formData.term}
                      onChange={e => setFormData({ ...formData, term: e.target.value })}
                      className="w-full border p-2 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-5">
                    <button
                      onClick={() => setModalType(null)}
                      className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Lưu
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
