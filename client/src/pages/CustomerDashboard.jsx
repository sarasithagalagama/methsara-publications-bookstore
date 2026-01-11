import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { format } from "date-fns";
import {
  User,
  Package,
  Settings,
  LogOut,
  ShoppingBag,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Truck,
  Image as ImageIcon,
  Loader2,
  Save,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { user, logout, checkUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showProfileAlert, setShowProfileAlert] = useState(false);

  // Settings State
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || "Sri Lanka",
      });

      // Check if profile is incomplete (missing phone or address)
      const isProfileIncomplete =
        !user.phone ||
        !user.address?.street ||
        !user.address?.city ||
        !user.address?.postalCode;

      if (isProfileIncomplete && activeTab !== "settings") {
        setShowProfileAlert(true);
        setActiveTab("settings");
      }
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await api.get("/orders/my-orders");
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Validation State
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^(?:0|94|\+94)?(?:7\d{8})$/; // Sri Lankan mobile format

    if (!profileData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(profileData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Invalid phone number (e.g., 0712345678)";
    }

    if (!profileData.street) newErrors.street = "Street address is required";
    if (!profileData.city) newErrors.city = "City is required";
    if (!profileData.postalCode)
      newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSavingProfile(true);
    setProfileMessage(null);

    try {
      const updateData = {
        name: profileData.name,
        phone: profileData.phone,
        address: {
          street: profileData.street,
          city: profileData.city,
          postalCode: profileData.postalCode,
          country: profileData.country,
        },
      };

      const res = await api.put("/auth/updatedetails", updateData);

      if (res.data.success) {
        // Refresh user data
        await checkUser();
        setProfileMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
        setShowProfileAlert(false);
        // Clear message after 3 seconds
        setTimeout(() => setProfileMessage(null), 3000);
      }
    } catch (error) {
      console.error("Profile update failed", error);
      setProfileMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Paid":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Processing":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 mr-1" />;
      case "Paid":
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case "Processing":
        return <Package className="w-4 h-4 mr-1" />;
      case "Shipped":
        return <Truck className="w-4 h-4 mr-1" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-100 text-center">
                <div className="w-20 h-20 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mb-4">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <h2 className="font-bold text-gray-900 truncate">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
              <nav className="p-2 space-y-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    activeTab === "overview"
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    activeTab === "orders"
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    activeTab === "settings"
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center flex-1">
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </div>
                  {showProfileAlert && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                <div className="pt-2 border-t border-gray-100 mt-2">
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors text-red-600 hover:bg-red-50`}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name}! 👋
                  </h1>
                  <p className="text-gray-500">
                    Manage your profile, check your orders, and update settings.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Info */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary-600" />
                      Profile Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="text-gray-600">{user?.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="text-gray-600">
                          {user?.phone || "No phone number added"}
                        </span>
                      </div>
                      <div className="flex items-start text-sm">
                        <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">
                          {user?.address?.street
                            ? `${user.address.street}, ${user.address.city}`
                            : "No address added"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                      Order Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-blue-700">
                          {orders.length}
                        </div>
                        <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                          Total Orders
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-green-700">
                          {
                            orders.filter((o) => o.status === "Delivered")
                              .length
                          }
                        </div>
                        <div className="text-xs font-medium text-green-600 uppercase tracking-wide">
                          Delivered
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      View All
                    </button>
                  </div>
                  {orders.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No orders placed yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {orders.slice(0, 3).map((order) => (
                        <div
                          key={order._id}
                          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              Order #{order._id.slice(-6).toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(order.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                          <div
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
                {loadingOrders ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start shopping to see your orders here.
                    </p>
                    <button
                      onClick={() => navigate("/shop")}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 transition"
                    >
                      Browse Books
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                      >
                        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                              Placed on{" "}
                              <span className="font-medium text-gray-900">
                                {format(
                                  new Date(order.createdAt),
                                  "MMMM d, yyyy"
                                )}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              ID:{" "}
                              <span className="font-mono text-gray-900">
                                #{order._id.slice(-8).toUpperCase()}
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              {order.status}
                            </div>
                            <span className="text-lg font-bold text-gray-900">
                              LKR {order.totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item._id} className="flex items-center">
                                <div className="flex-shrink-0 w-16 h-20 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                  {item.book.image && (
                                    <img
                                      src={item.book.image}
                                      alt={item.book.title}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="ml-4 flex-1">
                                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                                    {item.book.title}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {item.book.author}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900">
                                    LKR {item.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-gray-500">
                              Payment:{" "}
                              <span className="font-medium text-gray-900">
                                {order.notes || "Standard"}
                              </span>
                            </div>

                            {order.receiptImage && (
                              <a
                                href={order.receiptImage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                              >
                                <ImageIcon className="w-4 h-4 mr-2" />
                                View Receipt
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                </div>

                {showProfileAlert && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-orange-800">
                        Please complete your profile
                      </h4>
                      <p className="text-sm text-orange-700 mt-1">
                        To ensure smooth delivery of your orders, please provide
                        your phone number and shipping address.
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary-600" />
                    Personal & Shipping Details
                  </h3>

                  {profileMessage && (
                    <div
                      className={`mb-6 p-4 rounded-lg ${
                        profileMessage.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {profileMessage.text}
                    </div>
                  )}

                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                      <div className="col-span-1 md:col-span-2">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                          Personal Details
                        </h4>
                        <p className="text-xs text-gray-500 mb-6">
                          Update your personal information and contact details.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors bg-gray-50/50 hover:bg-white"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            placeholder="07XXXXXXXX"
                            required
                            className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors bg-gray-50/50 hover:bg-white ${
                              errors.phone ||
                              (!profileData.phone && showProfileAlert)
                                ? "border-red-300 ring-2 ring-red-100 placeholder-red-300"
                                : "border-gray-200"
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-600 mt-1 ml-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-8">
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                          Shipping Address
                        </h4>
                        <p className="text-xs text-gray-500">
                          Where should we send your orders?
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-gray-700">
                            Street Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="street"
                              value={profileData.street}
                              onChange={handleInputChange}
                              placeholder="No. 123, Main Street"
                              required
                              className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors bg-gray-50/50 hover:bg-white ${
                                errors.street ||
                                (!profileData.street && showProfileAlert)
                                  ? "border-red-300 ring-2 ring-red-100 placeholder-red-300"
                                  : "border-gray-200"
                              }`}
                            />
                          </div>
                          {errors.street && (
                            <p className="text-xs text-red-600 mt-1 ml-1">
                              {errors.street}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={profileData.city}
                            onChange={handleInputChange}
                            required
                            className={`block w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors bg-gray-50/50 hover:bg-white ${
                              errors.city ||
                              (!profileData.city && showProfileAlert)
                                ? "border-red-300 ring-2 ring-red-100 placeholder-red-300"
                                : "border-gray-200"
                            }`}
                          />
                          {errors.city && (
                            <p className="text-xs text-red-600 mt-1 ml-1">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Postal Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={profileData.postalCode}
                            onChange={handleInputChange}
                            required
                            className={`block w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors bg-gray-50/50 hover:bg-white ${
                              errors.postalCode ||
                              (!profileData.postalCode && showProfileAlert)
                                ? "border-red-300 ring-2 ring-red-100 placeholder-red-300"
                                : "border-gray-200"
                            }`}
                          />
                          {errors.postalCode && (
                            <p className="text-xs text-red-600 mt-1 ml-1">
                              {errors.postalCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={savingProfile}
                        className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30"
                      >
                        {savingProfile ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
