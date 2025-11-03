"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ---- Tabs Wrapper ---- */
export const Tabs = ({ children, value, onValueChange, className }: any) => {
  const [activeTab, setActiveTab] = React.useState(value);

  const handleChange = (val: string) => {
    setActiveTab(val);
    onValueChange?.(val);
  };

  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onChange: handleChange })
      )}
    </div>
  );
};

/* ---- TabsList ---- */
export const TabsList = ({ children, activeTab, onChange }: any) => {
  return (
    <div className="flex flex-wrap gap-2 bg-gray-100 rounded-lg p-1">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onChange })
      )}
    </div>
  );
};

/* ---- TabsTrigger ---- */
export const TabsTrigger = ({ value, children, activeTab, onChange }: any) => {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => onChange(value)}
      className={cn(
        "px-4 py-2 rounded-md font-medium text-sm transition",
        isActive
          ? "bg-indigo-500 text-white shadow-md"
          : "text-gray-600 hover:bg-indigo-100"
      )}
    >
      {children}
    </button>
  );
};

/* ---- TabsContent ---- */
export const TabsContent = ({ value, activeTab, children }: any) => {
  if (value !== activeTab) return null;
  return <div className="mt-6">{children}</div>;
};
