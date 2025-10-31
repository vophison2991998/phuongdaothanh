"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return <div className={cn("flex gap-2 border-b mb-4", className)}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  setActiveTab?: (val: string) => void;
}

export function TabsTrigger({
  value,
  children,
  className,
  activeTab,
  setActiveTab,
}: TabsTriggerProps) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab?.(value)}
      className={cn(
        "px-3 py-2 rounded-t-lg text-sm font-medium transition-colors",
        isActive ? "bg-white border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700",
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
}

export function TabsContent({
  value,
  children,
  className,
  activeTab,
}: TabsContentProps) {
  if (activeTab !== value) return null;
  return <div className={cn("p-4", className)}>{children}</div>;
}
