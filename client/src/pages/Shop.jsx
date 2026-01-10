import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  Bell,
  SlidersHorizontal,
  ChevronDown,
  Check,
  Star,
  Heart,
  Grid,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]); // For filter options
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All"); // Acting as 'Grade' filter
  const [activeSubjects, setActiveSubjects] = useState([]);
  const [activePriceRange, setActivePriceRange] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Handle URL search params
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (category) setActiveCategory(category);
    if (search) setSearchTerm(search);
  }, [searchParams]);

  // Fetch books from API
  useEffect(() => {
    fetchBooks();
  }, [activeCategory, activeSubjects, activePriceRange, searchTerm]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // Add grade filter
      if (activeCategory !== "All") {
        params.append("grade", activeCategory);
      }

      // Add search
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      // Fetch all books for display (no pagination limit for shop page)
      params.append("limit", "100");

      const response = await api.get(`/books?${params.toString()}`);
      let fetchedBooks = response.data.books || [];

      // Client-side filtering for subjects (since backend doesn't support multiple subjects)
      if (activeSubjects.length > 0) {
        fetchedBooks = fetchedBooks.filter((book) =>
          activeSubjects.includes(book.subject)
        );
      }

      // Client-side filtering for price range
      if (activePriceRange !== "All") {
        fetchedBooks = fetchedBooks.filter((book) => {
          if (activePriceRange === "< 500") return book.price < 500;
          if (activePriceRange === "500-1000")
            return book.price >= 500 && book.price <= 1000;
          if (activePriceRange === "1000+") return book.price > 1000;
          return true;
        });
      }

      setBooks(fetchedBooks);

      // Store all books for filter options (fetch once without filters)
      if (allBooks.length === 0) {
        const allBooksResponse = await api.get(`/books?limit=100`);
        setAllBooks(allBooksResponse.data.books || []);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans text-secondary-900">
      {/* Sidebar Filter - Desktop */}
      <aside className="hidden lg:block w-72 bg-white border-r border-secondary-100 p-8 fixed top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-secondary-900 flex items-center justify-between">
            <span>Filters</span>
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveSubjects([]);
                setActivePriceRange("All");
              }}
              className="text-xs text-primary-600 hover:text-primary-700 font-sans font-medium"
            >
              Reset All
            </button>
          </h2>
        </div>

        <div className="space-y-10">
          {/* Grade Filter */}
          <div>
            <h3 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-6">
              Grade
            </h3>
            <div className="space-y-3">
              {[
                "All",
                "A/L",
                "Grade 6",
                "Grade 7",
                "Grade 8",
                "Grade 9",
                "Grade 10",
                "Grade 11",
              ].map((grade, idx) => (
                <label
                  key={idx}
                  className="flex items-center group cursor-pointer"
                >
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="grade"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-secondary-300 transition-all checked:border-primary-500 checked:bg-primary-500 hover:border-primary-400"
                      checked={activeCategory === grade}
                      onChange={() => setActiveCategory(grade)}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                  </div>
                  <span
                    className={`ml-3 text-sm transition-colors ${
                      activeCategory === grade
                        ? "text-secondary-900 font-medium"
                        : "text-secondary-500 group-hover:text-secondary-700"
                    }`}
                  >
                    {grade}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          <div>
            <h3 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-6">
              Subject
            </h3>
            <div className="space-y-3">
              <label className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-secondary-300 transition-all checked:border-primary-500 checked:bg-primary-500 hover:border-primary-400"
                    checked={activeSubjects.length === 0}
                    onChange={() => setActiveSubjects([])}
                  />
                  <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                </div>
                <span
                  className={`ml-3 text-sm transition-colors ${
                    activeSubjects.length === 0
                      ? "text-secondary-900 font-medium"
                      : "text-secondary-500 group-hover:text-secondary-700"
                  }`}
                >
                  All
                </span>
              </label>

              {[...new Set(allBooks.map((b) => b.subject))].map(
                (subject, idx) => (
                  <label
                    key={idx}
                    className="flex items-center group cursor-pointer"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-secondary-300 transition-all checked:border-primary-500 checked:bg-primary-500 hover:border-primary-400"
                        checked={activeSubjects.includes(subject)}
                        onChange={() => {
                          if (activeSubjects.includes(subject)) {
                            setActiveSubjects(
                              activeSubjects.filter((s) => s !== subject)
                            );
                          } else {
                            setActiveSubjects([...activeSubjects, subject]);
                          }
                        }}
                      />
                      <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                    </div>
                    <span
                      className={`ml-3 text-sm transition-colors ${
                        activeSubjects.includes(subject)
                          ? "text-secondary-900 font-medium"
                          : "text-secondary-500 group-hover:text-secondary-700"
                      }`}
                    >
                      {subject}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-6">
              Price Range
            </h3>
            <div className="flex flex-wrap gap-2">
              {["All", "< 500", "500-1000", "1000+"].map((price, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePriceRange(price)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    activePriceRange === price
                      ? "bg-primary-500 border-primary-500 text-white"
                      : "border-secondary-200 text-secondary-600 hover:border-primary-500 hover:text-primary-600"
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 p-4 lg:p-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-secondary-900">
              Book Store
            </h1>
            <p className="text-secondary-500 text-sm">
              Find your next favorite study companion
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  // Simple debounce - update state after user stops typing
                  setTimeout(() => setSearchTerm(value), 500);
                }}
                className="w-full pl-10 pr-4 py-3 bg-secondary-50 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-secondary-200 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 bg-secondary-50 rounded-full hover:bg-secondary-100 text-secondary-900 transition-colors">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero / Promo Banner - KEPT AS USER LIKED */}
        <div className="relative w-full h-80 rounded-[2.5rem] overflow-hidden mb-12 group cursor-pointer shadow-xl shadow-secondary-900/5">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
            alt="Library"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 via-secondary-900/40 to-transparent flex flex-col justify-center px-8 md:px-16">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold italic text-white mb-4 max-w-xl leading-tight">
              A book is a gift you can open again and again
            </h2>
            <p className="text-white/80 mb-8 font-serif italic text-lg opacity-90">
              — Garrison Keillor
            </p>
            <div className="flex items-center gap-4">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white border-none rounded-full px-8 py-6 text-base shadow-lg hover:shadow-primary-500/30 transition-all font-serif italic">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Book Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-secondary-900">
              All Books
            </h2>
            <span className="text-sm text-secondary-500">
              Showing {books.length} results
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="group relative bg-white rounded-[2rem] p-4 border border-transparent hover:border-secondary-100 hover:shadow-xl hover:shadow-secondary-900/5 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-4 bg-secondary-50">
                  <Link to={`/books/${book._id}`}>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Badges - Removed as requested */}

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(book);
                      }}
                      className="w-10 h-10 bg-white text-secondary-900 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (isInWishlist(book._id)) {
                          removeFromWishlist(book._id);
                        } else {
                          addToWishlist(book);
                        }
                      }}
                      className={`w-10 h-10 bg-white rounded-full flex items-center justify-center transition-colors shadow-lg ${
                        isInWishlist(book._id)
                          ? "text-red-500 hover:text-red-600"
                          : "text-secondary-900 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isInWishlist(book._id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-2">
                  <Link to={`/books/${book._id}`} className="block">
                    <h3 className="font-sinhala font-bold text-secondary-900 text-lg mb-1 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                      {book.titleSinhala || book.title}
                    </h3>
                  </Link>
                  <p className="text-secondary-500 text-xs font-medium mb-3 line-clamp-1">
                    {book.title}
                  </p>

                  <div className="flex items-center justify-between border-t border-secondary-100 pt-3">
                    <span className="text-lg font-bold text-secondary-900">
                      Rs. {book.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
