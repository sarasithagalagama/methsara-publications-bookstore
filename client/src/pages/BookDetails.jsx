import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";
import Button from "../components/ui/Button";

// Mock data for initial display
const MOCK_BOOK = {
  id: 1,
  title: "The Silent Patient",
  author: "Alex Michaelides",
  price: 2500,
  originalPrice: 3000,
  rating: 4.8,
  reviews: 124,
  description:
    "The Silent Patient is a shocking psychological thriller of a woman's act of violence against her husband—and of the therapist obsessed with uncovering her motive. Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas.",
  longDescription:
    "Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.\n\nAlicia’s refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander, a mystery that captures the public imagination and casts Alicia into notoriety. The price of her art skyrockets, and she, the silent patient, is hidden away from the tabloids and spotlight at the Grove, a secure forensic unit in North London.",
  coverImage:
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  category: "Thriller",
  isbn: "978-1250301697",
  publisher: "Celadon Books",
  pages: 336,
  language: "English",
  stock: 15,
};

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(MOCK_BOOK);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(false);

  // In a real app, fetch data based on ID
  useEffect(() => {
    // fetchData(id);
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase" && quantity < book.stock) {
      setQuantity(quantity + 1);
    }
  };

  const addToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${book.title} to cart`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary-600 transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate">
            {book.title}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Column - Image */}
            <div className="p-8 md:p-12 lg:p-16 flex items-center justify-center bg-gray-50/50">
              <div className="relative group perspective-1000">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="relative rounded-lg shadow-2xl w-64 md:w-80 lg:w-96 object-cover transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                  {book.category}
                </span>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {book.title}
              </h1>
              <div className="mt-2 text-lg text-gray-600 font-medium">
                by {book.author}
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? "fill-current"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 border-l pl-4 border-gray-200">
                  {book.reviews} Reviews
                </span>
              </div>

              <div className="mt-8 flex items-end space-x-3">
                <span className="text-4xl font-bold text-primary-600">
                  LKR {book.price.toLocaleString()}
                </span>
                {book.originalPrice > book.price && (
                  <span className="text-xl text-gray-400 line-through mb-1">
                    LKR {book.originalPrice.toLocaleString()}
                  </span>
                )}
                {book.originalPrice > book.price && (
                  <span className="mb-2 px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">
                    {Math.round(
                      ((book.originalPrice - book.price) / book.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              <p className="mt-6 text-gray-600 leading-relaxed">
                {book.description}
              </p>

              <div className="mt-8 border-t border-b border-gray-100 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">Quantity</span>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-50 transition-colors rounded-l-lg"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-gray-900 font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-50 transition-colors rounded-r-lg"
                      disabled={quantity >= book.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>In Stock ({book.stock} available)</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button onClick={addToCart} className="flex-1 py-4 text-base">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <button className="flex-none p-4 rounded-xl border border-gray-200 text-gray-500 hover:text-primary-600 hover:border-primary-100 hover:bg-primary-50 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-primary-500" />
                  <span>Free delivery over LKR 5000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-primary-500" />
                  <span>Secure payment guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors
                    ${
                      activeTab === tab
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
            {activeTab === "description" && (
              <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {book.longDescription}
              </div>
            )}

            {activeTab === "details" && (
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">ISBN</dt>
                  <dd className="mt-1 text-sm text-gray-900">{book.isbn}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Publisher
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {book.publisher}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Language
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {book.language}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Pages</dt>
                  <dd className="mt-1 text-sm text-gray-900">{book.pages}</dd>
                </div>
              </dl>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-12 text-gray-500">
                <p>No reviews yet. Be the first to review this book!</p>
                <Button variant="outline" className="mt-4">
                  Write a Review
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
