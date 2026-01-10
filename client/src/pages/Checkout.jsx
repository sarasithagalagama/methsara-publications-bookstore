import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, CreditCard, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Checkout = () => {
  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 350;
  const total = subtotal + shipping;

  const [step, setStep] = useState(1); // 1: Info, 2: Payment
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      // Simulate order processing
      setTimeout(() => {
        setLoading(false);
        alert("Order placed successfully! (This is a demo)");
        navigate("/");
      }, 2000);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop">
          <Button>Go Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <div
              className={`flex items-center ${
                step >= 1 ? "text-primary-600 font-medium" : "text-gray-400"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 border ${
                  step >= 1
                    ? "border-primary-600 bg-primary-50"
                    : "border-gray-300"
                }`}
              >
                1
              </span>
              Shipping Information
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div
              className={`flex items-center ${
                step >= 2 ? "text-primary-600 font-medium" : "text-gray-400"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 border ${
                  step >= 2
                    ? "border-primary-600 bg-primary-50"
                    : "border-gray-300"
                }`}
              >
                2
              </span>
              Payment Method
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipping Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input required placeholder="First Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input required placeholder="Last Name" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <Input required placeholder="Street Address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Input required placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <Input required placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code
                      </label>
                      <Input required placeholder="Zip Code" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input required type="tel" placeholder="+94 7X XXX XXXX" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-primary-200 bg-primary-50 rounded-lg p-4 flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        id="card"
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        defaultChecked
                      />
                      <label
                        htmlFor="card"
                        className="ml-3 flex items-center flex-1"
                      >
                        <CreditCard className="w-5 h-5 text-primary-600 mr-2" />
                        <span className="font-medium text-gray-900">
                          Credit / Debit Card
                        </span>
                      </label>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        id="cod"
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <label
                        htmlFor="cod"
                        className="ml-3 flex items-center flex-1"
                      >
                        <Truck className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-900">
                          Cash on Delivery
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <Input placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                {step === 1 ? (
                  <Link
                    to="/cart"
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Cart
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Details
                  </button>
                )}

                <Button
                  type="submit"
                  className="min-w-[140px]"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : step === 1
                    ? "Continue to Payment"
                    : "Place Order"}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Your Order
              </h2>
              <ul className="divide-y divide-gray-100 mb-6 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <li key={item.book._id || item.book.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-20 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.book.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        LKR {(item.book.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    LKR {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {shipping === 0 ? "Free" : `LKR ${shipping}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-bold pt-2 border-t border-gray-100">
                  <span className="text-gray-900">Total</span>
                  <span className="text-primary-600">
                    LKR {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
