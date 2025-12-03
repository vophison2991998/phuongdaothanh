


export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nanager-layout">
      <header>Navbar người dùng</header>
      <main>{children}</main>
    </div>
  );
}
