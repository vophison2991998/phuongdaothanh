"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, className, children }: TabsProps) {
  const [active, setActive] = React.useState(defaultValue);

  const context = { active, setActive };

  return (
    <div className={cn("w-full", className)}>
      <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
    </div>
  );
}

const TabsContext = React.createContext<any>(null);
export function useTabs() {
  return React.useContext(TabsContext);
}

export function TabsList({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex gap-2 border-b border-gray-200", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { active, setActive } = useTabs();
  const isActive = active === value;

  return (
    <button
      onClick={() => setActive(value)}
      className={cn(
        "px-4 py-2 rounded-t-md text-sm font-medium transition-colors",
        isActive
          ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
          : "text-gray-600 hover:text-gray-800"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { active } = useTabs();
  if (active !== value) return null;
  return <div className="mt-4">{children}</div>;
}
