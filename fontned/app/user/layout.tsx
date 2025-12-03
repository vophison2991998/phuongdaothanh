export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="user-layout">
      <header>Navbar người dùng</header>
      <main>{children}</main>
    </div>
  );
}
