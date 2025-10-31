import { cn } from "@/lib/utils";
import React from "react";

// 🔹 Định nghĩa kiểu cho các biến thể
type BadgeVariant = "default" | "secondary";

// 🔹 Kiểu props cho component Badge
interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-indigo-500 text-white",
    secondary: "bg-indigo-100 text-indigo-700 border border-indigo-300",
  };

  return (
    <span
      className={cn(
        "inline-block text-sm font-medium rounded-full px-3 py-1",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
