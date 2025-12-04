"use client";

import Link from "next/link";

export default function SidebarItem({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded hover:bg-gray-700 transition"
    >
      {children}
    </Link>
  );
}
