"use client";
import React from "react";
import { Link } from "react-router-dom"; // or next/link if using Next.js
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 z-50">
      {/* Logo / Brand */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-[#a65238] tracking-wide hover:opacity-90 transition"
      >
        ShopEasy
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-[#a65238] transition"
        >
          Products
        </Link>

        <Link
          to="/cart"
          className="relative flex items-center text-gray-700 hover:text-[#a65238] transition"
        >
          <FiShoppingCart size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-[#a65238] text-white text-xs rounded-full px-2 py-0.5 font-semibold shadow">
              {totalItems}
            </span>
          )}
          <span className="ml-1 font-medium">Cart</span>
        </Link>
      </div>
    </nav>
  );
}
