import * as React from "react";
import { cn } from "@/lib/utils";

export const Label = ({
  className,
  children,
  htmlFor,
}: {
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
  >
    {children}
  </label>
);
