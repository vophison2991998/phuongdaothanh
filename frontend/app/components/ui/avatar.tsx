import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-full overflow-hidden bg-gray-200", className)} {...props} />;
}

export function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
  return <img src={src} alt={alt} className="object-cover w-full h-full" />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center w-full h-full text-gray-500">{children}</div>;
}
