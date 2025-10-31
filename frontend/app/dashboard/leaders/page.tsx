"use client";

import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaPlus, FaTrash, FaEdit, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

/* ============================================================
   Interfaces & Data
============================================================ */
interface Leader {
  id: string;
  name: string;
  title: string;
  term?: string;
  photo?: string;
  children: Leader[];
  scale: number;
}

const initialLeader: Leader = {
  id: "1",
  name: "Nguyễn Văn A",
  title: "Tổng Giám Đốc",
  term: "2024 - 2028",
  photo: "/images/leaders/leader1.jpg",
  scale: 1,
  children: [],
};

/* ============================================================
   Helper Functions
============================================================ */
const updateScaleRecursive = (node: Leader): Leader => {
  const newScale = node.children.length >= 5 ? 0.8 : 1;

  const updatedChildren = node.children.map((child) => {
    const updatedChild = updateScaleRecursive(child);
    return { ...updatedChild, scale: updatedChild.scale * newScale };
  });

  return { ...node, children: updatedChildren, scale: newScale };
};

/* ============================================================
   Components
============================================================ */
const PersonCard = memo(
  ({
    leader,
    onClick,
    onAdd,
    onEdit,
    onDelete,
  }: {
    leader: Leader;
    onClick: (leader: Leader) => void;
    onAdd: (leaderId: string) => void;
    onEdit: (leader: Leader) => void;
    onDelete: (leaderId: string) => void;
  }) => (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative flex flex-col items-center bg-white border border-gray-100 shadow-md rounded-2xl p-4 w-56"
      style={{ scale: leader.scale }}
    >
      <div
        onClick={() => onClick(leader)}
        className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 cursor-pointer hover:ring-4 hover:ring-blue-300 transition"
      >
        <Image
          src={leader.photo || "/images/placeholder-avatar.png"}
          alt={leader.name}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>

      <h3 className="mt-3 text-center font-semibold text-gray-800">{leader.name}</h3>
      <p className="text-sm text-gray-500 text-center">{leader.title}</p>
      {leader.term && <p className="text-xs text-gray-400 mt-1 italic">Nhiệm kỳ: {leader.term}</p>}

      <div className="flex gap-2 mt-3">
        <IconButton icon={<FaPlus />} color="green" onClick={() => onAdd(leader.id)} />
        <IconButton icon={<FaEdit />} color="blue" onClick={() => onEdit(leader)} />
        <IconButton icon={<FaTrash />} color="red" onClick={() => onDelete(leader.id)} />
      </div>
    </motion.div>
  )
);
PersonCard.displayName = "PersonCard";

/* ------------------------------- */
const IconButton = ({
  icon,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`p-1.5 bg-${color}-100 hover:bg-${color}-200 rounded-full transition`}
  >
    <span className={`text-${color}-600 text-sm`}>{icon}</span>
  </button>
);

/* ------------------------------- */
const LeaderTree = memo(
  ({
    leader,
    onClick,
    onAdd,
    onEdit,
    onDelete,
  }: {
    leader: Leader;
    onClick: (leader: Leader) => void;
    onAdd: (leaderId: string) => void;
    onEdit: (leader: Leader) => void;
    onDelete: (leaderId: string) => void;
  }) => (
    <motion.div layout className="flex flex-col items-center">
      <PersonCard leader={leader} onClick={onClick} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />

      {leader.children.length > 0 && (
        <motion.div
          layout
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col items-center"
          style={{ marginTop: `${32 * leader.scale}px` }}
        >
          <div className="w-0.5 h-8 bg-gray-300" />
          <div className="relative flex justify-center items-start">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300" />
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: `${12 * leader.scale}px`, marginTop: `${32 * leader.scale}px` }}
            >
              {leader.children.map((child) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  <div className="absolute -top-8 w-0.5 h-8 bg-gray-300" />
                  <LeaderTree
                    leader={child}
                    onClick={onClick}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
);
LeaderTree.displayName = "LeaderTree";

/* ============================================================
   Main Component
============================================================ */
export default function LeadersPage() {
  const [tree, setTree] = useState<Leader>(initialLeader);
  const [selected, setSelected] = useState<Leader | null>(null);
  const [zoom, setZoom] = useState(1);

  /* ------------ Handlers ------------ */
  const handleClick = useCallback((leader: Leader) => setSelected(leader), []);

  const handleAdd = useCallback((leaderId: string) => {
    const name = prompt("Nhập tên nhân viên mới:");
    if (!name) return;

    const addToTree = (node: Leader): Leader => {
      if (node.id === leaderId) {
        if (node.children.length >= 5) {
          toast.error("❌ Mỗi node chỉ được có tối đa 5 node con!");
          return node;
        }
        const newMember: Leader = {
          id: Date.now().toString(),
          name,
          title: "Chức vụ mới",
          photo: "/images/placeholder-avatar.png",
          scale: 1,
          children: [],
        };
        return { ...node, children: [...node.children, newMember] };
      }
      return { ...node, children: node.children.map(addToTree) };
    };

    const updatedTree = addToTree(tree);
    setTree(updateScaleRecursive(updatedTree));
    toast.success(`✅ Đã thêm nhân viên "${name}"`);
  }, [tree]);

  const handleDelete = useCallback(
    (leaderId: string) => {
      if (!confirm("Bạn có chắc muốn xóa người này?")) return;

      const removeFromTree = (node: Leader): Leader | null => {
        if (node.id === leaderId) return null;
        const children = node.children.map(removeFromTree).filter(Boolean) as Leader[];
        return { ...node, children };
      };

      const updated = removeFromTree(tree);
      if (updated) setTree(updateScaleRecursive(updated));
      toast.error("🗑️ Đã xóa nhân viên!");
    },
    [tree]
  );

  const handleEdit = useCallback(
    (leader: Leader) => {
      const newName = prompt("Nhập tên mới:", leader.name);
      if (!newName) return;
      const updateTree = (node: Leader): Leader => {
        if (node.id === leader.id) return { ...node, name: newName };
        return { ...node, children: node.children.map(updateTree) };
      };
      setTree(updateTree(tree));
      toast.success(`✏️ Đã cập nhật tên "${newName}"`);
    },
    [tree]
  );

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.1, 2)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.1, 0.3)), []);

  /* ------------ JSX ------------ */
  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 relative">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        SƠ ĐỒ TỔ CHỨC NHÂN SỰ
      </h1>

      <div className="overflow-auto pb-8">
        <motion.div
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
          className="min-w-[900px] flex justify-center relative"
        >
          <LeaderTree
            leader={tree}
            onClick={handleClick}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </motion.div>
      </div>

      {/* Zoom controls */}
      <div className="fixed top-1/2 right-4 flex flex-col gap-2 bg-white/90 p-2 rounded-lg shadow-lg z-50">
        <button onClick={zoomIn} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
          <FaSearchPlus />
        </button>
        <button onClick={zoomOut} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
          <FaSearchMinus />
        </button>
      </div>

      {/* Modal hiển thị chi tiết */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 w-[400px] shadow-2xl text-center"
            >
              <Image
                src={selected.photo || "/images/placeholder-avatar.png"}
                alt={selected.name}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 border-4 border-blue-400"
              />
              <h3 className="text-xl font-bold text-gray-700">{selected.name}</h3>
              <p className="text-gray-500">{selected.title}</p>
              {selected.term && (
                <p className="text-sm text-gray-400 mt-1">Nhiệm kỳ: {selected.term}</p>
              )}
              <button
                onClick={() => setSelected(null)}
                className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
