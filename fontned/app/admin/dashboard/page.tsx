// app/admin/dashboard/page.tsx
import AdminRoute from "@/app/components/protected/AdminRoute";

export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Chỉ admin mới thấy được trang này</p>
      </div>
    </AdminRoute>
  );
}
