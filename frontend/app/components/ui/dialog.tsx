"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children }: any) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export const DialogContent = ({ children }: any) => <>{children}</>;
export const DialogHeader = ({ children }: any) => (
  <div className="mb-3">{children}</div>
);
export const DialogTitle = ({ children }: any) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);
export const DialogFooter = ({ children }: any) => (
  <div className="flex justify-end gap-2 mt-4">{children}</div>
);
