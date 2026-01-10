import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
