import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "./components/layout"; // Chú ý viết hoa 'L'

export const metadata = {
  title: "HR Dashboard",
  description: "Hệ thống quản lý nhân sự",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
