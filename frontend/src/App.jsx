import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#cf6c50",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
