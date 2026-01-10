import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Loader2,
  X,
  Upload,
  Image as ImageIcon,
  Search,
  DollarSign,
  AlertTriangle,
  Tag,
  TrendingDown,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalBooks: 0,
  });

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    grade: "",
  });

  // Debounced search term to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    titleSinhala: "",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
    isbn: "",
    pageCount: "",
    publisher: "",
    category: "Grade 6-11",
    grade: "Grade 6",
    subject: "",
    price: "",
    stock: 100,
    description: "",
    image: "",
    backCoverImage: "",
    isFlashSale: false,
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [backImageUploading, setBackImageUploading] = useState(false);

  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    fetchDashboardData();
  }, [
    pagination.page,
    debouncedSearch,
    filters.category,
    filters.grade,
    activeTab,
  ]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (activeTab === "products" || activeTab === "overview") {
        try {
          const queryParams = new URLSearchParams({
            page: pagination.page,
            limit: pagination.limit,
            search: debouncedSearch,
            ...(filters.category && { category: filters.category }),
            ...(filters.grade && { grade: filters.grade }),
          });

          const booksRes = await axios.get(
            `http://localhost:5000/api/books?${queryParams}`
          );
          setBooks(booksRes.data.books || []);
          setPagination((prev) => ({
            ...prev,
            totalPages: booksRes.data.pages || 1,
            totalBooks: booksRes.data.total || 0,
          }));
        } catch (err) {
          console.error("Error fetching books:", err);
        }
      }

      if (activeTab === "orders" || activeTab === "overview") {
        try {
          // Orders fetch remains the same for now
          const ordersRes = await axios.get(
            "http://localhost:5000/api/orders/all",
            config
          );
          setOrders(ordersRes.data.orders || []);
        } catch (err) {
          console.error("Error fetching orders:", err);
        }
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to page 1 on filter change
  };

  // Existing handlers...

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // specific refresh to keep pagination consistent or just fetch again
      fetchDashboardData();
    } catch (error) {
      alert("Failed to delete book.");
    }
  };

  // ... (handleOrderStatus, handleInputChange, handleImageUpload, openAddModal, openEditModal, handleSubmit) - keeping them but need to ensure they call fetchDashboardData() correctly on success if needed.

  const handleOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(
        orders.map((order) => (order._id === id ? { ...order, status } : order))
      );
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const setLoader =
      field === "image" ? setImageUploading : setBackImageUploading;
    setLoader(true);

    try {
      const token = localStorage.getItem("token");
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const res = await axios.post(
        "http://localhost:5000/api/upload/image",
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData((prev) => ({ ...prev, [field]: res.data.url }));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed");
    } finally {
      setLoader(false);
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setCurrentBook(null);
    setFormData({
      title: "",
      titleSinhala: "",
      author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
      isbn: "",
      pageCount: "",
      publisher: "",
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "",
      price: "",
      stock: 100,
      description: "",
      image: "",
      backCoverImage: "",
      isFlashSale: false,
      salePrice: "",
      discountPercentage: "",
      saleStartDate: "",
      saleEndDate: "",
      displayOrder: 999,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setEditMode(true);
    setCurrentBook(book);
    setFormData({
      title: book.title || "",
      titleSinhala: book.titleSinhala || "",
      author: book.author || "",
      isbn: book.isbn || "",
      pageCount: book.pageCount || "",
      publisher: book.publisher || "",
      category: book.category || "Grade 6-11",
      grade: book.grade || "6",
      subject: book.subject || "",
      price: book.price || "",
      stock: book.stock || 0,
      description: book.description || "",
      image: book.image || "",
      backCoverImage: book.backCoverImage || "",
      isFlashSale: book.isFlashSale || false,
      salePrice: book.salePrice || "",
      discountPercentage: book.discountPercentage || "",
      saleStartDate: book.saleStartDate ? book.saleStartDate.split("T")[0] : "",
      saleEndDate: book.saleEndDate ? book.saleEndDate.split("T")[0] : "",
      displayOrder: book.displayOrder || 999,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        pageCount: Number(formData.pageCount) || 0,
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        discountPercentage: formData.discountPercentage
          ? Number(formData.discountPercentage)
          : undefined,
        saleStartDate: formData.saleStartDate || undefined,
        saleEndDate: formData.saleEndDate || undefined,
      };

      // Remove undefined fields
      Object.keys(payload).forEach(
        (key) => payload[key] === undefined && delete payload[key]
      );

      if (editMode && currentBook) {
        await axios.put(
          `http://localhost:5000/api/books/${currentBook._id}`,
          payload,
          config
        );
      } else {
        await axios.post("http://localhost:5000/api/books", payload, config);
      }
      setIsModalOpen(false);
      fetchDashboardData(); // Refresh list to see changes
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save product.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-serif font-bold text-primary-700">
            Admin
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
              activeTab === "overview"
                ? "bg-primary-50 text-primary-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <TrendingUp className="w-5 h-5 mr-3" /> Overview
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
              activeTab === "products"
                ? "bg-primary-50 text-primary-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Package className="w-5 h-5 mr-3" /> Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
              activeTab === "orders"
                ? "bg-primary-50 text-primary-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ShoppingBag className="w-5 h-5 mr-3" /> Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  label="Total Products"
                  value={pagination.totalBooks || books.length}
                  icon={Package}
                  bg="bg-purple-50"
                  color="text-purple-600"
                />
                <StatCard
                  label="Total Orders"
                  value={orders.length}
                  icon={ShoppingBag}
                  bg="bg-blue-50"
                  color="text-blue-600"
                />
                <StatCard
                  label="Low Stock Items"
                  value={
                    books.filter((b) => b.stock <= 10 && b.stock > 0).length
                  }
                  icon={AlertTriangle}
                  bg="bg-orange-50"
                  color="text-orange-600"
                />
                <StatCard
                  label="Active Sales"
                  value={
                    books.filter((b) => b.salePrice || b.isFlashSale).length
                  }
                  icon={Tag}
                  bg="bg-green-50"
                  color="text-green-600"
                />
              </div>

              {/* Revenue & Inventory Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Inventory Status */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-purple-600" />
                    Inventory Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        In Stock
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {books.filter((b) => b.stock > 10).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Low Stock (≤10)
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        {
                          books.filter((b) => b.stock <= 10 && b.stock > 0)
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Out of Stock
                      </span>
                      <span className="text-lg font-bold text-red-600">
                        {books.filter((b) => b.stock === 0).length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sales Overview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-green-600" />
                    Sales Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Flash Sales
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        {books.filter((b) => b.isFlashSale).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Discounted Items
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {books.filter((b) => b.salePrice).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Regular Price
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {
                          books.filter((b) => !b.salePrice && !b.isFlashSale)
                            .length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Low Stock Alert */}
              {books.filter((b) => b.stock <= 10 && b.stock > 0).length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-orange-900 mb-2">
                        Low Stock Alert
                      </h3>
                      <p className="text-sm text-orange-700 mb-3">
                        {
                          books.filter((b) => b.stock <= 10 && b.stock > 0)
                            .length
                        }{" "}
                        product(s) are running low on stock
                      </p>
                      <div className="space-y-2">
                        {books
                          .filter((b) => b.stock <= 10 && b.stock > 0)
                          .slice(0, 5)
                          .map((book) => (
                            <div
                              key={book._id}
                              className="flex justify-between items-center bg-white p-3 rounded-lg"
                            >
                              <span className="text-sm font-medium text-gray-900 font-sinhala">
                                {book.titleSinhala || book.title}
                              </span>
                              <span className="text-sm font-bold text-orange-600">
                                {book.stock} left
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Orders */}
              {orders.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                      Recent Orders
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                              #{order._id.slice(-6).toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.customerName || "Customer"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  {/* Filters */}
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Categories</option>
                    <option value="Grade 6-11">Grade 6-11</option>
                    <option value="Advanced Level">Advanced Level</option>
                  </select>
                  <select
                    value={filters.grade}
                    onChange={(e) =>
                      handleFilterChange("grade", e.target.value)
                    }
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Grades</option>
                    <option value="A/L">A/L</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                  </select>

                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by title, author, or ISBN..."
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={filters.search}
                      onChange={(e) =>
                        handleFilterChange("search", e.target.value)
                      }
                    />
                  </div>
                  <Button onClick={openAddModal}>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Category / Grade
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {books.map((book) => (
                        <tr
                          key={book._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-12 w-9 flex-shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                {book.image ? (
                                  <img
                                    className="h-full w-full object-cover"
                                    src={book.image}
                                    alt=""
                                  />
                                ) : (
                                  <ImageIcon className="h-full w-full p-2 text-gray-400" />
                                )}
                              </div>
                              <div className="ml-4 min-w-0 flex-1">
                                <div
                                  className="text-sm font-medium text-gray-900 font-sinhala"
                                  title={book.titleSinhala}
                                >
                                  {book.titleSinhala}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {book.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {book.grade}
                            </div>
                            <div className="text-xs text-gray-500">
                              {book.subject}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              {book.salePrice ? (
                                <>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-orange-600">
                                      Rs. {book.salePrice}
                                    </span>
                                    {book.isFlashSale && (
                                      <span className="px-1.5 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded">
                                        FLASH
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 line-through">
                                      Rs. {book.price}
                                    </span>
                                    {book.discountPercentage && (
                                      <span className="text-xs font-medium text-green-600">
                                        -{book.discountPercentage}%
                                      </span>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <div className="text-sm font-medium text-gray-900">
                                  Rs. {book.price}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full ${
                                book.stock > 10
                                  ? "bg-green-100 text-green-800"
                                  : book.stock > 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {book.stock} in stock
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => openEditModal(book)}
                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBook(book._id)}
                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {books.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-12 text-center text-gray-500"
                          >
                            <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p className="text-base font-medium text-gray-900">
                              No products found
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Get started by creating a new product.
                            </p>
                            <div className="mt-6">
                              <Button onClick={openAddModal}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Product
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {books.length > 0 && (
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                      Showing{" "}
                      <span className="font-medium">
                        {(pagination.page - 1) * pagination.limit + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          pagination.page * pagination.limit,
                          pagination.totalBooks
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {pagination.totalBooks}
                      </span>{" "}
                      results
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(5, pagination.totalPages) },
                          (_, i) => {
                            let pageNum = i + 1;

                            // Show pages around current page
                            if (pagination.totalPages > 5) {
                              if (pagination.page <= 3) {
                                pageNum = i + 1;
                              } else if (
                                pagination.page >=
                                pagination.totalPages - 2
                              ) {
                                pageNum = pagination.totalPages - 4 + i;
                              } else {
                                pageNum = pagination.page - 2 + i;
                              }
                            }

                            if (pageNum > pagination.totalPages || pageNum < 1)
                              return null;

                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                  pagination.page === pageNum
                                    ? "bg-primary-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Orders Management
                </h2>
                <div className="text-sm text-gray-500">
                  Total Orders:{" "}
                  <span className="font-bold text-gray-900">
                    {orders.length}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Receipt
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-12 text-center">
                            <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p className="text-base font-medium text-gray-900">
                              No orders yet
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Orders will appear here when customers make
                              purchases.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr
                            key={order._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-primary-600">
                                #{order._id.slice(-8).toUpperCase()}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {order.customerName || "N/A"}
                              </div>
                              {order.email && (
                                <div className="text-xs text-gray-500">
                                  {order.email}
                                </div>
                              )}
                              {order.phone && (
                                <div className="text-xs text-gray-500">
                                  {order.phone}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {order.items?.length || 0} item(s)
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900">
                                Rs. {order.total?.toLocaleString() || "0"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {order.createdAt
                                  ? new Date(
                                      order.createdAt
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {order.createdAt
                                  ? new Date(
                                      order.createdAt
                                    ).toLocaleTimeString()
                                  : ""}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.status || "pending"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.receiptImage ? (
                                <a
                                  href={order.receiptImage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary-600 hover:text-primary-800 font-semibold underline inline-flex items-center"
                                >
                                  View
                                </a>
                              ) : (
                                <span className="text-xs text-gray-400">
                                  N/A
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                className="text-sm border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 px-3 py-1.5"
                                value={order.status}
                                onChange={(e) =>
                                  handleOrderStatus(order._id, e.target.value)
                                }
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {editMode ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                  Book Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Input
                      label="Title (English) *"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., 8 SHRENIYA VIDYAWA I KOTASA"
                      required
                    />
                    <Input
                      label="Title (Sinhala)"
                      name="titleSinhala"
                      value={formData.titleSinhala}
                      onChange={handleInputChange}
                      placeholder="e.g., 8 ශ්‍රේණිය විද්‍යාව I කොටස"
                      className="font-sinhala"
                    />
                    <Input
                      label="Author *"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති"
                      required
                      className="font-sinhala"
                    />
                    <Input
                      label="Publisher"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleInputChange}
                      placeholder="මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers"
                      className="font-sinhala"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="ISBN"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                        placeholder="978-XXXXXXXXXX"
                      />
                      <Input
                        label="Page Count"
                        name="pageCount"
                        type="number"
                        value={formData.pageCount}
                        onChange={handleInputChange}
                        placeholder="e.g., 120"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                          required
                        >
                          <option value="Grade 6-11">Grade 6-11</option>
                          <option value="Advanced Level">Advanced Level</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Grade *
                        </label>
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                          required
                        >
                          <option value="Grade 6">Grade 6</option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="Grade 8">Grade 8</option>
                          <option value="Grade 9">Grade 9</option>
                          <option value="Grade 10">Grade 10</option>
                          <option value="Grade 11">Grade 11</option>
                          <option value="A/L">A/L</option>
                        </select>
                      </div>
                    </div>
                    <Input
                      label="Subject *"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g., Science, Mathematics, Biology"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Price (Rs.) *"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="e.g., 320"
                        required
                      />
                      <Input
                        label="Stock *"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="e.g., 100"
                        required
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <Input
                        label="Display Order"
                        name="displayOrder"
                        type="number"
                        value={formData.displayOrder}
                        onChange={handleInputChange}
                        placeholder="e.g., 1 (lower numbers appear first)"
                      />
                      <p className="text-xs text-blue-700 mt-1">
                        💡 Set the display order for this book. Lower numbers
                        (1, 2, 3...) appear first in the shop. Default is 999.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                {/* Front Cover */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Front Cover Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "image")}
                        className="hidden"
                        id="front-cover-upload"
                      />
                      <label
                        htmlFor="front-cover-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-2"
                      >
                        <Upload className="w-4 h-4 mr-2" /> Upload New
                      </label>
                      {imageUploading && (
                        <span className="ml-2 text-sm text-gray-500">
                          Uploading...
                        </span>
                      )}
                      <Input
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="Or enter URL"
                        className="mt-2 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Back Cover */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Back Cover Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                      {formData.backCoverImage ? (
                        <img
                          src={formData.backCoverImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "backCoverImage")}
                        className="hidden"
                        id="back-cover-upload"
                      />
                      <label
                        htmlFor="back-cover-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-2"
                      >
                        <Upload className="w-4 h-4 mr-2" /> Upload New
                      </label>
                      {backImageUploading && (
                        <span className="ml-2 text-sm text-gray-500">
                          Uploading...
                        </span>
                      )}
                      <Input
                        name="backCoverImage"
                        value={formData.backCoverImage}
                        onChange={handleInputChange}
                        placeholder="Or enter URL"
                        className="mt-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-sans"
                />
              </div>

              {/* Sale Offer Section */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 flex items-center">
                  Sale Offer Settings
                  <span className="ml-2 px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded-full font-normal normal-case">
                    Optional
                  </span>
                </h3>
                <div className="space-y-4">
                  {/* Flash Sale Toggle */}
                  <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <input
                      type="checkbox"
                      id="isFlashSale"
                      name="isFlashSale"
                      checked={formData.isFlashSale}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="isFlashSale"
                      className="flex-1 cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-900">
                        Mark as Flash Sale
                      </span>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Display this product with a special flash sale badge
                      </p>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Sale Price (Rs.)"
                      name="salePrice"
                      type="number"
                      value={formData.salePrice}
                      onChange={handleInputChange}
                      placeholder="e.g., 250"
                    />
                    <Input
                      label="Discount Percentage (%)"
                      name="discountPercentage"
                      type="number"
                      value={formData.discountPercentage}
                      onChange={handleInputChange}
                      placeholder="e.g., 20"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sale Start Date
                      </label>
                      <input
                        type="date"
                        name="saleStartDate"
                        value={formData.saleStartDate}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sale End Date
                      </label>
                      <input
                        type="date"
                        name="saleEndDate"
                        value={formData.saleEndDate}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                      />
                    </div>
                  </div>

                  {formData.price && formData.salePrice && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Savings:</span> Rs.{" "}
                        {(
                          Number(formData.price) - Number(formData.salePrice)
                        ).toFixed(2)}{" "}
                        (
                        {(
                          ((Number(formData.price) -
                            Number(formData.salePrice)) /
                            Number(formData.price)) *
                          100
                        ).toFixed(1)}
                        % off)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editMode ? "Update Product" : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, bg }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}
    >
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

export default AdminDashboard;
