import React, { useState, useEffect } from "react";
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
  Phone,
  Heart,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Button } from "./ui/Button";
import api from "../services/api";

const Navbar = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  // Search handler with debounce
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await api.get(
        `/books?search=${encodeURIComponent(query)}&limit=5`
      );
      setSearchResults(response.data.books || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="flex flex-col w-full z-50 sticky top-0">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 hidden md:flex justify-between items-center z-50">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            <a
              href="tel:0714325383"
              className="hover:text-gray-300 transition-colors"
            >
              071 432 5383
            </a>
            <span className="mx-1">/</span>
            <a
              href="tel:0714485899"
              className="hover:text-gray-300 transition-colors"
            >
              071 448 5899
            </a>
          </span>
          <span className="text-gray-400">|</span>
          <a
            href="mailto:methsarabooks@gmail.com"
            className="hover:text-gray-300 transition-colors"
          >
            methsarabooks@gmail.com
          </a>
        </div>
        <div className="flex items-center space-x-4 font-medium">
          <span>Island-wide Delivery</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-gray-200 py-2"
            : "bg-white border-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="/logo.png"
                alt="Methsara Publications"
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {[
                { name: "Home", path: "/" },
                { name: "Books", path: "/shop" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors py-2 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button
                onClick={() => setShowSearchModal(true)}
                className="hidden md:flex p-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="hidden md:flex p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group relative"
              >
                <Heart className="h-5 w-5" />
                {getWishlistCount() > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-sm ring-2 ring-white">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative p-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all group"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-sm ring-2 ring-white">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  </button>

                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowUserMenu(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-20 transform origin-top-right animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-5 py-4 border-b border-gray-50 mb-2">
                          <p className="text-sm font-bold text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {user?.email}
                          </p>
                        </div>

                        <div className="px-2 space-y-1">
                          <Link
                            to="/dashboard"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Package className="h-4 w-4 mr-3" />
                            My Dashboard
                          </Link>

                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <LayoutDashboard className="h-4 w-4 mr-3" />
                              Admin Dashboard
                            </Link>
                          )}
                        </div>

                        <div className="border-t border-gray-50 mt-2 pt-2 px-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
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
                <div className="hidden md:flex items-center space-x-3 ml-2">
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-primary-700 hover:bg-primary-50"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-full px-6 shadow-md hover:shadow-lg shadow-primary-500/20">
                      Register
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
          <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-xl">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block text-lg font-medium text-gray-900 py-2 border-b border-gray-50"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block text-lg font-medium text-gray-900 py-2 border-b border-gray-50"
                onClick={() => setShowMobileMenu(false)}
              >
                Books
              </Link>
              <Link
                to="/about"
                className="block text-lg font-medium text-gray-900 py-2 border-b border-gray-50"
                onClick={() => setShowMobileMenu(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-lg font-medium text-gray-900 py-2 border-b border-gray-50"
                onClick={() => setShowMobileMenu(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="pt-4 pb-2">
                    <p className="text-sm font-bold text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center text-gray-700 py-3"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Package className="w-5 h-5 mr-3" /> My Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center text-gray-700 py-3"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3" /> Admin
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center w-full text-left text-red-600 py-3 font-medium"
                  >
                    <LogOut className="w-5 h-5 mr-3" /> Logout
                  </button>
                </>
              ) : (
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => {
                      navigate("/login");
                      setShowMobileMenu(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full justify-center"
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

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
            {/* Search Input */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-gray-500 mt-4">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-4 space-y-2">
                  {searchResults.map((book) => (
                    <Link
                      key={book._id}
                      to={`/books/${book._id}`}
                      onClick={() => {
                        setShowSearchModal(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate font-sinhala">
                          {book.titleSinhala || book.title}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {book.title}
                        </p>
                        <p className="text-sm font-bold text-primary-600 mt-1">
                          Rs. {book.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                  {searchResults.length === 5 && (
                    <Link
                      to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        setShowSearchModal(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="block text-center py-3 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View all results →
                    </Link>
                  )}
                </div>
              ) : searchQuery ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">
                    No books found for "{searchQuery}"
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => {
                      setShowSearchModal(false);
                      setSearchQuery("");
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block"
                  >
                    Browse all books →
                  </Link>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Start typing to search for books...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
