import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  Check,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../services/api";
import SEO from "../components/SEO";

const BookDetails = () => {
  // ...
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch book from API by ID
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data.book);
      } catch (error) {
        console.error("Error fetching book:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (book) {
      // Add quantity times
      for (let i = 0; i < quantity; i++) {
        addToCart(book);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-4">
          Book Not Found
        </h2>
        <p className="text-secondary-500 mb-8 text-center max-w-md">
          The book you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link to="/shop">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans text-secondary-900">
      <SEO
        title={book.title}
        description={`${book.title} by ${book.author}. ${book.subject} book for ${book.grade}. Published by ${book.publisher}.`}
        keywords={`${book.title}, ${book.author}, ${book.subject}, ${book.grade}, sri lanka education`}
        image={book.image}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-secondary-500 mb-8">
          <Link
            to="/"
            className="hover:text-primary-600 transition-colors font-medium"
          >
            Home
          </Link>
          <span className="mx-2 text-secondary-300">/</span>
          <Link
            to="/shop"
            className="hover:text-primary-600 transition-colors font-medium"
          >
            Shop
          </Link>
          <span className="mx-2 text-secondary-300">/</span>
          <span className="text-secondary-900 font-semibold truncate hover:text-primary-600 cursor-default">
            {book.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Image */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] bg-secondary-50 rounded-[2rem] overflow-hidden shadow-2xl shadow-secondary-900/10 mb-8 border border-secondary-100">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {book.isFlashSale && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  Sale
                </div>
              )}
            </div>

            {/* Thumbnails (Mock) - Optional */}
            {/* <div className="flex gap-4 overflow-x-auto pb-2 w-full max-w-md">
              {[book.image, book.image, book.image].map((img, i) => (
                <button key={i} className="relative w-24 h-32 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary-500 transition-all flex-shrink-0">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div> */}
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 uppercase tracking-widest mb-4">
                {book.category}
              </span>

              <h1 className="font-bold text-3xl md:text-4xl text-secondary-900 leading-tight mb-2 font-sinhala">
                {book.titleSinhala || book.title}
              </h1>
              <h2 className="text-xl text-secondary-500 font-medium mb-4">
                {book.title}
              </h2>

              <div className="flex flex-col gap-1 text-sm text-secondary-600 font-sinhala mb-6 border-l-4 border-primary-200 pl-4 py-1">
                <p>
                  <span className="font-bold text-secondary-900 uppercase text-xs tracking-wider mr-2 font-sans">
                    Author:
                  </span>
                  {book.author}
                </p>
                <p>
                  <span className="font-bold text-secondary-900 uppercase text-xs tracking-wider mr-2 font-sans">
                    Publisher:
                  </span>
                  {book.publisher}
                </p>
                <p>
                  <span className="font-bold text-secondary-900 uppercase text-xs tracking-wider mr-2 font-sans">
                    Subjects:
                  </span>
                  {book.subject}
                </p>
                {book.isbn && (
                  <p>
                    <span className="font-bold text-secondary-900 uppercase text-xs tracking-wider mr-2 font-sans">
                      ISBN:
                    </span>
                    <span className="font-sans">{book.isbn}</span>
                  </p>
                )}
                {book.pageCount && (
                  <p>
                    <span className="font-bold text-secondary-900 uppercase text-xs tracking-wider mr-2 font-sans">
                      Pages:
                    </span>
                    <span className="font-sans">{book.pageCount}</span>
                  </p>
                )}
              </div>

              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-bold text-secondary-900 font-serif">
                  Rs. {book.price.toLocaleString()}
                </span>
                {/* Mock original price for flash sales */}
                {book.isFlashSale && (
                  <span className="text-xl text-secondary-400 line-through mb-1">
                    Rs. {(book.price * 1.2).toFixed(0)}
                  </span>
                )}
              </div>

              {/* Description Tabs */}
              <div className="mb-8 border-b border-secondary-100">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`pb-4 text-sm font-medium transition-colors relative ${
                      activeTab === "description"
                        ? "text-primary-600"
                        : "text-secondary-500 hover:text-secondary-700"
                    }`}
                  >
                    Description
                    {activeTab === "description" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className={`pb-4 text-sm font-medium transition-colors relative ${
                      activeTab === "shipping"
                        ? "text-primary-600"
                        : "text-secondary-500 hover:text-secondary-700"
                    }`}
                  >
                    Shipping & Returns
                    {activeTab === "shipping" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full"></div>
                    )}
                  </button>
                </nav>
              </div>

              <div className="prose prose-sm max-w-none text-secondary-600 mb-10 min-h-[100px]">
                {activeTab === "description" ? (
                  <p className="whitespace-pre-line font-sinhala leading-relaxed">
                    {book.description ||
                      `This educational resource is designed for students in ${book.grade} studying ${book.subject}. It contains comprehensive questions and answers to help students prepare for their exams effectively. Published by ${book.publisher}, this book adheres to the local syllabus standards.`}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-primary-500" />
                      Delivery within 3-5 business days.
                    </p>
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary-500" />
                      Secure packaging and handling.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-100">
                <div className="flex items-center border border-secondary-200 rounded-full h-12 w-32">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="flex-1 flex items-center justify-center text-secondary-500 hover:text-primary-600 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-secondary-900 font-bold w-8 text-center bg-transparent">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="flex-1 flex items-center justify-center text-secondary-500 hover:text-primary-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 rounded-full h-12 text-base font-medium shadow-lg hover:shadow-primary-500/25"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <button
                    onClick={() => {
                      if (isInWishlist(book._id)) {
                        removeFromWishlist(book._id);
                      } else {
                        addToWishlist(book);
                      }
                    }}
                    className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all ${
                      isInWishlist(book._id)
                        ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-100"
                        : "border-secondary-200 text-secondary-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50"
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

              <div className="mt-8 flex gap-6 text-xs text-secondary-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-900">In Stock</span>
                    <span>Ready to ship</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-900">Authentic</span>
                    <span>100% Original</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
