import React from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
  CreditCard,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";
import SEO from "../components/SEO";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 350; // Free shipping over 5000
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <SEO title="Shopping Cart" description="Your shopping cart is empty." />
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Looks like you haven't added any books to your cart yet. Explore our
          collection to find your next read.
        </p>
        <Link to="/shop">
          <Button size="lg">
            Start Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <SEO
        title="Shopping Cart"
        description="Review your selected books before checkout."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item.book._id || item.book.id} className="p-6">
                    <div className="flex items-center sm:items-start">
                      <div className="flex-shrink-0 w-24 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={item.book.image}
                          alt={item.book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6 min-h-[8rem]">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-lg font-bold text-gray-900 font-sinhala leading-tight">
                                <Link
                                  to={`/books/${item.book._id || item.book.id}`}
                                  className="hover:text-primary-600 transition-colors"
                                >
                                  {item.book.titleSinhala || item.book.title}
                                </Link>
                              </h3>
                            </div>
                            {item.book.titleSinhala && (
                              <p className="text-sm text-gray-600 mt-1">
                                {item.book.title}
                              </p>
                            )}
                            <p className="mt-1 text-sm text-gray-500 font-sinhala">
                              {item.book.author}
                            </p>
                            <p className="mt-2 text-lg font-bold text-primary-600">
                              LKR {item.book.price?.toLocaleString()}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label
                              htmlFor={`quantity-${item.book._id}`}
                              className="sr-only"
                            >
                              Quantity, {item.book.title}
                            </label>
                            <div className="flex items-center border border-gray-200 rounded-lg w-max">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.book._id || item.book.id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:bg-gray-50 text-gray-500 rounded-l-lg"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.book._id || item.book.id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:bg-gray-50 text-gray-500 rounded-r-lg"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                onClick={() =>
                                  removeFromCart(item.book._id || item.book.id)
                                }
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <span className="sr-only">Remove</span>
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link
                to="/shop"
                className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h2>

              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    LKR {subtotal.toLocaleString()}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping Estimate</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `LKR ${shipping}`
                    )}
                  </dd>
                </div>
                {shipping > 0 && (
                  <div className="text-xs text-gray-500 italic">
                    Free shipping on orders over LKR 5,000
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-bold text-gray-900">
                    Order Total
                  </dt>
                  <dd className="text-base font-bold text-primary-600">
                    LKR {total.toLocaleString()}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link to="/checkout">
                  <Button className="w-full py-3 text-base">
                    Proceed to Checkout
                    <CreditCard className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex justify-center space-x-2 text-gray-400">
                {/* Payment Icons Placeholder */}
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
