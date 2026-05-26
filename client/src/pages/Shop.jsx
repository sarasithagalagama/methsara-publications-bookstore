import React, { useState, useEffect, useMemo } from "react";
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
  X,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import SEO from "../components/SEO";

const Shop = () => {
  // ... (rest of the component logic hidden)
  const [allBooks, setAllBooks] = useState([]); // For filter options
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All"); // Acting as 'Grade' filter
  const [activeSubjects, setActiveSubjects] = useState([]);
  const [activePriceRange, setActivePriceRange] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const [lastAddedBook, setLastAddedBook] = useState(null);

  const { addToCart } = useCart();
  // wishlist actions removed from product card; keep wishlist context usage in components that need it
  // (no wishlist usage in this file anymore)
  const navigate = useNavigate();

  // Handle URL search params
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (category) setActiveCategory(category);
    if (search) {
      setSearchInput(search);
      setSearchTerm(search);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/books?limit=1000`);
        setAllBooks(response.data.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const availableSubjects = useMemo(
    () => [...new Set(allBooks.map((book) => book.subject).filter(Boolean))],
    [allBooks],
  );

  const displayedBooks = useMemo(() => {
    let filteredBooks = [...allBooks];

    if (activeCategory !== "All") {
      filteredBooks = filteredBooks.filter(
        (book) => book.grade === activeCategory,
      );
    }

    if (searchTerm) {
      const normalizedSearch = searchTerm.toLowerCase();
      filteredBooks = filteredBooks.filter((book) => {
        const searchableFields = [
          book.title,
          book.titleSinhala,
          book.author,
          book.isbn,
          book.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableFields.includes(normalizedSearch);
      });
    }

    if (activeSubjects.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        activeSubjects.includes(book.subject),
      );
    }

    if (activePriceRange !== "All") {
      filteredBooks = filteredBooks.filter((book) => {
        if (activePriceRange === "< 500") return book.price < 500;
        if (activePriceRange === "500-1000") {
          return book.price >= 500 && book.price <= 1000;
        }
        if (activePriceRange === "1000+") return book.price > 1000;
        return true;
      });
    }

    return filteredBooks;
  }, [allBooks, activeCategory, activeSubjects, activePriceRange, searchTerm]);

  const handleBuyNow = (book) => {
    addToCart(book);
    navigate("/checkout");
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    setLastAddedBook(book);
    setCartPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex font-sans text-secondary-900">
      <SEO
        title="Shop"
        description="Browse our extensive collection of educational books, past papers, and revision guides."
        keywords="book shop, buy books online, educational books, sri lanka"
      />
      {/* Sidebar Filter - Desktop */}
      <aside className="hidden lg:block w-72 bg-white border-r border-secondary-100 p-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
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

              {availableSubjects.map((subject, idx) => (
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
                            activeSubjects.filter((s) => s !== subject),
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
              ))}
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

      {/* Mobile Filter Panel */}
      {isMobileFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Filter Panel */}
          <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-secondary-900">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-secondary-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Reset All */}
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveSubjects([]);
                  setActivePriceRange("All");
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-6"
              >
                Reset All
              </button>

              <div className="space-y-8">
                {/* Grade Filter */}
                <div>
                  <h3 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-4">
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
                            name="grade-mobile"
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
                  <h3 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-4">
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

                    {availableSubjects.map((subject, idx) => (
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
                                  activeSubjects.filter((s) => s !== subject),
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
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-4">
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

              {/* Apply Button */}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full mt-8 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-full font-medium transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-0 p-4 lg:p-8">
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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-secondary-50 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-secondary-200 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="p-3 bg-secondary-50 rounded-full hover:bg-secondary-100 text-secondary-900 transition-colors"
              >
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
            fetchPriority="high"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-secondary-900/90 via-secondary-900/40 to-transparent flex flex-col justify-center px-8 md:px-16">
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
              Showing {displayedBooks.length} results
            </span>
          </div>

          {loading ? (
            <div className="rounded-4xl border border-secondary-100 bg-secondary-50 px-6 py-10 text-center text-secondary-500">
              Loading books...
            </div>
          ) : displayedBooks.length === 0 ? (
            <div className="rounded-4xl border border-secondary-100 bg-secondary-50 px-6 py-10 text-center text-secondary-500">
              No books match your current filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
              {displayedBooks.map((book) => (
                <div
                  key={book._id}
                  className="group relative bg-white rounded-4xl p-4 border border-transparent hover:border-secondary-100 hover:shadow-xl hover:shadow-secondary-900/5 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-3/4 rounded-3xl overflow-hidden mb-4 bg-secondary-50">
                    <Link to={`/books/${book._id}`}>
                      <img
                        src={book.image}
                        alt={book.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-secondary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {/* Badges - Removed as requested */}

                    {/* Quick Actions - visible only on hover */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(book);
                        }}
                        aria-label={`Add ${book.title || "book"} to cart`}
                        className="h-10 px-6 bg-white text-secondary-900 rounded-full flex items-center justify-center gap-2 hover:bg-primary-500 hover:text-white transition-colors shadow-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-100"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-2">
                    <Link to={`/books/${book._id}`} className="block">
                      <h3 className="font-sinhala font-bold text-secondary-900 text-base mb-1 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
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
          )}
        </div>
      </main>

      {cartPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-secondary-100">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900">
                  Added to cart
                </h3>
                <p className="mt-2 text-sm text-secondary-500">
                  {lastAddedBook?.titleSinhala ||
                    lastAddedBook?.title ||
                    "This book"}{" "}
                  has been added to your cart.
                </p>
              </div>
              <button
                onClick={() => setCartPopupOpen(false)}
                className="rounded-full p-2 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-700"
                aria-label="Close popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setCartPopupOpen(false)}
                className="h-12 rounded-full flex-1"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => {
                  setCartPopupOpen(false);
                  navigate("/checkout");
                }}
                className="h-12 rounded-full flex-1"
              >
                Go to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
