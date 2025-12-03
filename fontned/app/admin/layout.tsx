export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside>Menu quản trị</aside>
      <main>{children}</main>
    </div>
  );
}
