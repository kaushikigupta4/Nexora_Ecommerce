"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FiStar } from "react-icons/fi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // adjust backend URL if needed
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#f2ebe5] p-8">
      <h1 className="text-3xl font-bold text-center text-[#a65238] mb-8">
        Our Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-9">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-3 flex flex-col text-center"
          >
            <img
              src={p.image}
              alt={p.title}
              className="h-40 w-full object-contain mb-4"
            />
            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              {p.title}
            </h2>

            {/* rating */}
            {p.rating && (
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${
                      i < Math.round(p.rating.rate)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({p.rating.count})
                </span>
              </div>
            )}

            {/* 💬 Description */}
            <p className="text-gray-600 text-[15px] mb-1 line-clamp-3 truncate">
              {p.description}
            </p>

            <p className="text-[#a65238] font-semibold text-lg">
              ${p.price}
            </p>

            <button
              onClick={() => addToCart(p)}
              className="mt-auto bg-[#a65238] text-white px-5 py-2 rounded-full font-medium hover:bg-[#8b3f2d] transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
