"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CheckoutModal from "../components/CheckoutModal";
import { FiTrash2 } from "react-icons/fi";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f2ebe5] p-8">
      <h1 className="text-3xl font-bold text-center text-[#a65238] mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
              <thead className="bg-[#a65238] text-white">
                <tr>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-right">Subtotal</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b last:border-none hover:bg-[#f8f3ef] transition-colors"
                  >
                    <td className="p-3 font-medium text-gray-800 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-contain rounded-md bg-[#f9f6f4] p-2"
                      />
                      {item.title}
                    </td>
                    <td className="p-3 text-gray-700">${item.price}</td>

                    {/* Quantity control */}
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            updateQty(item._id, Math.max(item.qty - 1, 1))
                          }
                          className="bg-[#a65238] text-white w-7 h-7 rounded-full hover:bg-[#8b3f2d] transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3 text-gray-800 font-medium">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          className="bg-[#a65238] text-white w-7 h-7 rounded-full hover:bg-[#8b3f2d] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="p-3 text-right text-gray-700 font-semibold">
                      ${(item.price * item.qty).toFixed(2)}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Checkout section */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xl font-semibold text-gray-800">
              Total: <span className="text-[#a65238]">${total.toFixed(2)}</span>
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#a65238] text-white px-6 py-2 rounded-full font-medium hover:bg-[#8b3f2d] transition-colors"
            >
              Checkout
            </button>
          </div>

          {showModal && (
            <CheckoutModal total={total} onClose={() => setShowModal(false)} />
          )}
        </>
      )}
    </div>
  );
}
