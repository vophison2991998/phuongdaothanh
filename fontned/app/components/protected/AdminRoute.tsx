"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loading from "../Loading";

interface Props {
  children: ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/dashboard");
      return;
    }

    setAuthorized(true);
    setChecking(false);
  }, [router]);

  if (checking) return <Loading />;
  if (!authorized) return null;

  return <>{children}</>;
}
