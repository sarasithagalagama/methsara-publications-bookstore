import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  Package,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/Button";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                Methsara Publications
              </span>
              <span className="ml-2 text-xl font-bold text-gray-900 sm:hidden">
                Methsara
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Books
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon (Desktop) */}
            <button className="hidden md:block p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <User className="h-5 w-5" />
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/my-orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Package className="h-4 w-4 mr-3" />
                        My Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <LayoutDashboard className="h-4 w-4 mr-3" />
                          Admin Dashboard
                        </Link>
                      )}

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Register
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block text-base font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-base font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setShowMobileMenu(false)}
            >
              Books
            </Link>
            <Link
              to="/about"
              className="block text-base font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setShowMobileMenu(false)}
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">{user?.email}</p>
                </div>
                <Link
                  to="/my-orders"
                  className="block text-base font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Orders
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block text-base font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left text-base font-medium text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigate("/login");
                    setShowMobileMenu(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => {
                    navigate("/register");
                    setShowMobileMenu(false);
                  }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
