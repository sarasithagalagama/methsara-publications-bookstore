import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/Button";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Save items you love to your wishlist. Review them anytime and easily
            move them to the cart.
          </p>
          <Link to="/shop">
            <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <button
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 relative group"
            >
              {/* Product Image */}
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                <Link to={`/books/${book._id}`}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Sale Badge */}
                {book.isOnSale && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    {book.discountPercentage}% OFF
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(book._id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <Link to={`/books/${book._id}`}>
                  <h3 className="font-sinhala font-bold text-gray-900 text-lg mb-1 line-clamp-1 hover:text-primary-600 transition-colors">
                    {book.titleSinhala || book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                    {book.title}
                  </p>
                </Link>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    {book.isOnSale ? (
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary-600">
                          Rs. {book.salePrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          Rs. {book.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        Rs. {book.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => addToCart(book)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
