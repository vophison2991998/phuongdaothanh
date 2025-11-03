"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

/* ==========================
   Kiểu dữ liệu người dùng
========================== */
interface User {
  id: number;
  username: string;
  token: string; // thêm token để frontend gọi API
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

/* ==========================
   Giải mã JWT token
========================== */
const decodeToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.id,
      username: payload.username,
      token, // lưu lại token để sử dụng cho API
    };
  } catch {
    return null;
  }
};

/* ==========================
   Provider chính
========================== */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser(decoded);
        if (pathname === "/login") router.replace("/dashboard");
      } else {
        localStorage.removeItem("token");
        setUser(null);
        if (pathname !== "/login") router.replace("/login");
      }
    } else {
      if (pathname !== "/login") router.replace("/login");
    }

    setLoading(false);
  }, [pathname, router]);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = decodeToken(token);
    if (decoded) {
      setUser(decoded);
      router.replace("/dashboard");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được dùng trong AuthProvider");
  return context;
};
