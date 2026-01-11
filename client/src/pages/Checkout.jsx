import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Truck, Upload, FileText, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import api from "../services/api";
import { toast } from "react-hot-toast";

const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 350;
  const total = subtotal + shipping;

  const [step, setStep] = useState(1); // 1: Info, 2: Payment
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank"); // Only 'bank' now
  const [receiptFile, setReceiptFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    postalCode: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setReceiptFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setReceiptFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      // Validate address
      const required = [
        "firstName",
        "lastName",
        "address1",
        "city",
        "district",
        "postalCode",
        "phone",
      ];
      const missing = required.filter((field) => !shippingAddress[field]);

      if (missing.length > 0) {
        toast.error("Please fill in all required fields");
        return;
      }
      setStep(2);
    } else {
      // Handle Payment & Order Creation

      if (!receiptFile) {
        toast.error("Please upload your payment receipt");
        return;
      }

      setLoading(true);

      try {
        let receiptUrl = null;

        // Upload Receipt
        const formData = new FormData();
        formData.append("receipt", receiptFile);

        const uploadRes = await api.post("/upload/receipt", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (uploadRes.data.success) {
          receiptUrl = uploadRes.data.url;
        } else {
          throw new Error("Failed to upload receipt");
        }

        // Create Order Object
        const orderData = {
          items: cartItems.map((item) => ({
            book: item.book._id,
            quantity: item.quantity,
          })),
          shippingAddress: {
            name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            phone: shippingAddress.phone,
            street: `${shippingAddress.address1}, ${shippingAddress.address2}`,
            city: shippingAddress.city,
            province: shippingAddress.district,
            postalCode: shippingAddress.postalCode,
            country: "Sri Lanka",
          },
          totalAmount: total,
          notes: "Bank Transfer",
          receiptImage: receiptUrl,
        };

        const res = await api.post("/orders", orderData);

        if (res.data.success) {
          toast.success("Order placed successfully!");
          clearCart();
          navigate("/my-orders"); // Redirect to custom orders page
        }
      } catch (error) {
        console.error("Order error:", error);
        toast.error(error.response?.data?.message || "Failed to place order");
      } finally {
        setLoading(false);
      }
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
                      <Input
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  {/* Sri Lankan Standard Address Format */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1
                      </label>
                      <Input
                        name="address1"
                        value={shippingAddress.address1}
                        onChange={handleInputChange}
                        required
                        placeholder="House No / Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <Input
                        name="address2"
                        value={shippingAddress.address2}
                        onChange={handleInputChange}
                        placeholder="Street / Road"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Input
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <select
                        name="district"
                        value={shippingAddress.district}
                        onChange={handleInputChange}
                        required
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <Input
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        required
                        placeholder="Postal Code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleInputChange}
                        required
                        type="tel"
                        placeholder="+94 7X XXX XXXX"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment
                  </h2>

                  <div className="space-y-4">
                    {/* Bank Transfer Option */}
                    <div
                      onClick={() => setPaymentMethod("bank")}
                      className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                        paymentMethod === "bank"
                          ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                          : "border-gray-200 hover:border-primary-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        id="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <label
                        htmlFor="bank"
                        className="ml-3 flex items-center flex-1 cursor-pointer"
                      >
                        <FileText className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium text-gray-900">
                          Bank Transfer
                        </span>
                      </label>
                    </div>

                  {/* Bank Transfer Details */}
                  {paymentMethod === "bank" && (
                    <div className="mt-6 space-y-6">
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-4">
                          Bank Details
                        </h3>
                        <div className="space-y-2 text-sm text-blue-800">
                          <p>
                            <span className="font-semibold w-32 inline-block">
                              Bank:
                            </span>{" "}
                            Commercial Bank
                          </p>
                          <p>
                            <span className="font-semibold w-32 inline-block">
                              Branch:
                            </span>{" "}
                            Colombo Main
                          </p>
                          <p>
                            <span className="font-semibold w-32 inline-block">
                              Account Name:
                            </span>{" "}
                            Methsara Publications
                          </p>
                          <p>
                            <span className="font-semibold w-32 inline-block">
                              Account No:
                            </span>{" "}
                            8000 1234 5678
                          </p>
                        </div>
                        <p className="mt-4 text-xs text-blue-600">
                          Please transfer the total amount of{" "}
                          <strong>LKR {total.toLocaleString()}</strong> and
                          upload the receipt below.
                        </p>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 transition-colors text-center">
                        {!previewUrl ? (
                          <>
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h4 className="font-medium text-gray-900 mb-1">
                              Upload Receipt
                            </h4>
                            <p className="text-sm text-gray-500 mb-4">
                              PNG, JPG up to 5MB
                            </p>
                            <label className="inline-flex">
                              <span className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium shadow-sm">
                                Select File
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </label>
                          </>
                        ) : (
                          <div className="relative inline-block">
                            <img
                              src={previewUrl}
                              alt="Receipt preview"
                              className="max-h-64 rounded-lg shadow-md"
                            />
                            <button
                              type="button"
                              onClick={removeFile}
                              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <p className="mt-2 text-sm text-green-600 font-medium flex items-center justify-center">
                              <Check className="w-4 h-4 mr-1" />
                              Receipt Selected
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
                        src={item.book.image}
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
