import React, { useEffect, useState } from "react";
import { getCart, updateQty, removeFromCart } from "../api";

export default function Cart({ open, onClose, user, onCheckout }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    if (open && user) fetchCart();
  }, [open]);

  const fetchCart = async () => {
    const res = await getCart(user._id);
    setCart(res);
  };

  const handleQty = async (id, qty) => {
    const updated = await updateQty(id, qty);
    setCart(updated);
  };

  const handleRemove = async (id) => {
    const updated = await removeFromCart(id);
    setCart(updated);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="bg-white w-full sm:w-96 h-full p-6 overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#cf6c50]">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 text-lg">
            ✕
          </button>
        </div>

        {cart.items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 border-b pb-2"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1 mx-3">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleQty(item._id, item.qty - 1)}
                    className="px-2 border rounded text-gray-600 hover:bg-gray-100"
                    disabled={item.qty <= 1}
                  >
                    -
                  </button>
                  <span className="px-2">{item.qty}</span>
                  <button
                    onClick={() => handleQty(item._id, item.qty + 1)}
                    className="px-2 border rounded text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="ml-2 text-red-500 hover:underline"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="mt-6 text-right border-t pt-4">
              <p className="text-lg font-semibold text-gray-800">
                Total: ${cart.total.toFixed(2)}
              </p>
              <button
                onClick={onCheckout}
                className="mt-3 bg-[#cf6c50] text-white px-4 py-2 rounded-lg hover:bg-[#b6593d] transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
