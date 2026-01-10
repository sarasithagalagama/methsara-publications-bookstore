import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  Bell,
  Filter,
  Star,
  Heart,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getBooks } from "../services/bookService";
import { Link } from "react-router-dom";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const { addToCart } = useCart();

  // Mock data for UI showcase (to match the beautiful reference design immediately)
  // In a real scenario, we merge this with backend data
  const mockBooks = [
    {
      _id: "1",
      title: "This Book and Innocence",
      author: "Eve Matthews",
      price: 810,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
      rating: 4.2,
      isFlashSale: true,
      category: "Romance",
    },
    {
      _id: "2",
      title: "Books and Glasses",
      author: "Jessie Merrill",
      price: 1700,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
      rating: 4.8,
      isFlashSale: true,
      category: "Science",
    },
    {
      _id: "3",
      title: "Beautiful and Dare",
      author: "Arlene Pena",
      price: 900,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
      rating: 5.0,
      isFlashSale: true,
      category: "Adventure",
    },
    {
      _id: "4",
      title: "Morning White",
      author: "Tyra Dhall",
      price: 2400,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
      rating: 4.5,
      isFlashSale: true,
      category: "Fantasy",
    },
    {
      _id: "5",
      title: "My Book and Daily Life",
      author: "Taylor Woods",
      price: 2750,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
      rating: 4.7,
      isFlashSale: true,
      category: "Lifestyle",
    },
    {
      _id: "6",
      title: "The Design of Everyday",
      author: "Don Norman",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
      rating: 4.9,
      isFlashSale: false,
      category: "Design",
    },
  ];

  /* 
  // Backend Integration (Commented out to show UI first as requested)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  */

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBooks(mockBooks);
      setLoading(false);
    }, 500);
  }, []);

  const categories = [
    "All",
    "Grade 6-11",
    "Advanced Level",
    "Adventure",
    "Fantasy",
    "Science",
    "Romance",
  ];
  const priceTags = ["Rs. 500 - 1000", "Rs. 1000 - 2000", "Rs. 2000+"];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar Filter - Desktop */}
      <aside className="hidden lg:block w-72 bg-white border-r border-gray-100 p-8 fixed top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="bg-gray-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
              M
            </span>
            Methsara
          </h2>
        </div>

        <div className="space-y-8">
          {/* Navigation Group */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Discover
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-xl"
                >
                  <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3"></span>
                  Shop All
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-500 hover:text-gray-900 px-3 py-2 rounded-xl transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>
                  Flash Sales
                </a>
              </li>
            </ul>
          </div>

          {/* Filters */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filter</h3>
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Category
              </h4>
              <div className="space-y-2">
                {categories.map((cat, idx) => (
                  <label
                    key={idx}
                    className="flex items-center group cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition-colors ${
                        activeCategory === cat
                          ? "bg-gray-900 border-gray-900"
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}
                    >
                      {activeCategory === cat && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    />
                    <span
                      className={`text-sm ${
                        activeCategory === cat
                          ? "text-gray-900 font-medium"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Price</h4>
              <div className="flex flex-wrap gap-2">
                {priceTags.map((tag, idx) => (
                  <button
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 p-4 lg:p-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <span className="text-gray-400">Sent to</span>
            <span className="font-semibold text-gray-900 flex items-center gap-1">
              Colombo, LK <ChevronDown className="w-3 h-3" />
            </span>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Find the best educational books..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-white rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-all">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-all">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero / Promo Banner */}
        <div className="relative w-full h-80 rounded-[2.5rem] overflow-hidden mb-10 group cursor-pointer shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
            alt="Library"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 max-w-xl leading-tight">
              A book is a gift you can open again and again
            </h2>
            <p className="text-gray-300 mb-8 font-medium italic">
              — Garrison Keillor
            </p>
            <div className="flex items-center gap-4">
              <Button className="bg-[#B89F7D] hover:bg-[#a68e6d] text-white border-none rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all">
                Claim Discount
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white rounded-full px-8 py-6 text-base backdrop-blur-sm"
              >
                Best Seller Book
              </Button>
            </div>
          </div>
        </div>

        {/* Book Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Books</h2>
            <div className="flex items-center gap-2">
              <button className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100">
                Latest
              </button>
              <button className="text-sm font-medium text-white px-3 py-1 bg-gray-900 rounded-full shadow-md">
                Best Seller
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="group relative bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Tags/Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {book.isFlashSale && (
                      <span className="bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full border border-white/10">
                        Flash Sale
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="flex items-center gap-1 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {book.rating}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 shadow-sm transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-2 pb-2">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 truncate leading-tight group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                    {book.author}
                    <span className="inline-block w-3 h-3 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-2 h-2" />
                    </span>
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {book.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(book)}
                      className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-transform active:scale-95 shadow-lg shadow-gray-900/20"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="rounded-full px-8 border-gray-300 hover:bg-gray-50 text-gray-600"
            >
              Load More Books
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
