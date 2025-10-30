"use client";
import React, { useState } from "react";

export default function CheckoutModal({ total, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [receiptId] = useState(`RCPT-${Math.floor(100000 + Math.random() * 900000)}`);
  const purchaseDate = new Date().toLocaleString();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      alert("Please fill in all fields before proceeding.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#f2ebe5] rounded-2xl shadow-2xl p-6 w-80 sm:w-96 text-center relative">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-[#a65238] mb-4">
              Checkout
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a65238] outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a65238] outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a65238] outline-none"
                  placeholder="Enter your full address"
                  rows={2}
                  required
                />
              </div>

              <p className="text-lg font-medium text-gray-800 mt-4">
                Total Amount:{" "}
                <span className="text-[#a65238] font-bold">
                  ${total.toFixed(2)}
                </span>
              </p>

              <button
                type="submit"
                className="bg-[#a65238] text-white w-full py-2 rounded-lg font-medium hover:bg-[#8b3f2d] transition mt-3"
              >
                Confirm & Pay
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-4 text-gray-600 hover:text-[#a65238] text-sm underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#a65238] mb-3">
              🧾 Payment Receipt
            </h2>

            <div className="bg-white rounded-lg shadow-inner p-4 text-left mb-4">
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Receipt ID:</span> {receiptId}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Date:</span> {purchaseDate}
              </p>
              <hr className="my-2 border-gray-300" />
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Name:</span> {form.name}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Email:</span> {form.email}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Address:</span> {form.address}
              </p>
              <div className="border-t mt-3 pt-2">
                <p className="text-base font-semibold text-gray-800">
                  Total Paid:{" "}
                  <span className="text-[#a65238] font-bold">
                    ${total.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              A confirmation email has been sent to{" "}
              <b>{form.email}</b>.
            </p>

            <button
              onClick={onClose}
              className="bg-[#a65238] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#8b3f2d] transition"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
