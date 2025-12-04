"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function SidebarGroup({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 rounded"
      >
        <span>{label}</span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {open && <div className="ml-3">{children}</div>}
    </div>
  );
}
