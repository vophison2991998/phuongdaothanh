// api/api.ts
export const loginAdmin = async (username: string, password: string): Promise<string> => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Đăng nhập thất bại");
  }

  const data = await res.json();
  return data.token; // trả token cho frontend lưu
};
