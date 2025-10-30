const API = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const login = async (name, email) => {
  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(`${API}/products`);
  return res.json();
};

export const getCart = async (userId) => {
  const res = await fetch(`${API}/cart?userId=${userId}`);
  return res.json();
};

export const addToCart = async ({ userId, productId, qty = 1 }) => {
  const res = await fetch(`${API}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, qty })
  });
  return res.json();
};

export const updateQty = async (cartItemId, qty) => {
  const res = await fetch(`${API}/cart/${cartItemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty })
  });
  return res.json();
};

export const removeFromCart = async (cartItemId) => {
  const res = await fetch(`${API}/cart/${cartItemId}`, { method: "DELETE" });
  return res.json();
};

export const checkout = async (userId, name, email) => {
  const res = await fetch(`${API}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name, email })
  });
  return res.json();
};
