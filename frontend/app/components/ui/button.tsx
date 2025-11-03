import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary"; // ✅ thêm secondary
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          // 🎨 Các kiểu nút
          variant === "default" &&
            "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
          variant === "outline" &&
            "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-indigo-500",
          variant === "ghost" &&
            "text-gray-700 hover:bg-gray-100 focus:ring-indigo-500",
          variant === "link" &&
            "text-indigo-600 underline-offset-4 hover:underline focus:ring-indigo-500",
          variant === "secondary" && // ✅ thêm kiểu secondary
            "bg-gray-200 text-blue-700 hover:bg-gray-300 focus:ring-indigo-500",
          // 📏 Kích thước
          size === "default" && "h-10 px-4",
          size === "sm" && "h-8 px-3",
          size === "lg" && "h-11 px-8",
          size === "icon" && "h-10 w-10",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
