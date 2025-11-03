import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          variant === "default" && "bg-indigo-600 text-white hover:bg-indigo-700",
          variant === "outline" && "border border-gray-300 hover:bg-gray-100",
          variant === "ghost" && "hover:bg-gray-100",
          variant === "link" && "text-indigo-600 underline-offset-4 hover:underline",
          size === "sm" && "h-8 px-3",
          size === "lg" && "h-11 px-8",
          size === "icon" && "h-10 w-10",
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
