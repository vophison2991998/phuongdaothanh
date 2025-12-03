"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loading from "../Loading";

interface Props {
  children: ReactNode;
  allowedRoles: ("admin" | "manager" | "user")[]; // roles được phép truy cập
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role") as "admin" | "manager" | "user" | undefined;

    // Nếu chưa login
    if (!token || !role) {
      router.replace("/login");
      return;
    }

    // Nếu role không hợp lệ
    if (!allowedRoles.includes(role)) {
      // Redirect về dashboard phù hợp
      if (role === "admin") router.replace("/admin/dashboard");
      else if (role === "manager") router.replace("/manager/dashboard");
      else router.replace("/dashboard"); // user
      return;
    }

    setAuthorized(true);
    setChecking(false);
  }, [router, allowedRoles]);

  if (checking) return <Loading />;
  if (!authorized) return null;

  return <>{children}</>;
}
