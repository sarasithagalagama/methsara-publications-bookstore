import React, { useState, useEffect } from "react";
import api from "../services/api";
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
  FileText,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bulk Selection State
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkOperation, setBulkOperation] = useState("");
  const [bulkFormData, setBulkFormData] = useState({
    discountPercentage: "",
    salePrice: "",
    saleStartDate: "",
    saleEndDate: "",
    isFlashSale: false,
  });

  // Book List Modal State
  const [isBookListModalOpen, setIsBookListModalOpen] = useState(false);
  const [bookListModalTitle, setBookListModalTitle] = useState("");
  const [bookListModalBooks, setBookListModalBooks] = useState([]);

  // Confirmation Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

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
      if (activeTab === "products" || activeTab === "overview") {
        try {
          const queryParams = new URLSearchParams({
            page: pagination.page,
            limit: pagination.limit,
            search: debouncedSearch,
            ...(filters.category && { category: filters.category }),
            ...(filters.grade && { grade: filters.grade }),
          });

          const booksRes = await api.get(`/books?${queryParams}`);
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
          const ordersRes = await api.get("/orders/all");
          setOrders(ordersRes.data.orders || []);
        } catch (err) {
          console.error("Error fetching orders:", err);
        }
      }

      if (activeTab === "users") {
        try {
          const usersRes = await api.get("/users");
          setUsers(usersRes.data.users || []);
        } catch (err) {
          console.error("Error fetching users:", err);
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
      await api.delete(`/books/${id}`);
      // specific refresh to keep pagination consistent or just fetch again
      fetchDashboardData();
    } catch (error) {
      alert("Failed to delete book.");
    }
  };

  // ... (handleOrderStatus, handleInputChange, handleImageUpload, openAddModal, openEditModal, handleSubmit) - keeping them but need to ensure they call fetchDashboardData() correctly on success if needed.

  const handleOrderStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      setOrders(
        orders.map((order) => (order._id === id ? { ...order, status } : order))
      );
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  const handleUserRoleUpdate = async (id, newRole) => {
    if (
      !window.confirm(
        `Are you sure you want to change this user's role to ${newRole}?`
      )
    )
      return;
    try {
      await api.put(`/users/${id}/role`, { role: newRole });
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      alert("Failed to update user role.");
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
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const res = await api.post("/upload/image", formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
        await api.put(`/books/${currentBook._id}`, payload);
      } else {
        await api.post("/books", payload);
      }
      setIsModalOpen(false);
      fetchDashboardData(); // Refresh list to see changes
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save product.");
    }
  };

  // Bulk Operation Handlers
  const handleSelectBook = (bookId) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map((book) => book._id));
    }
  };

  const openBulkModal = (operation) => {
    setBulkOperation(operation);
    setIsBulkModalOpen(true);
  };

  const closeBulkModal = () => {
    setIsBulkModalOpen(false);
    setBulkOperation("");
    setBulkFormData({
      discountPercentage: "",
      salePrice: "",
      saleStartDate: "",
      saleEndDate: "",
      isFlashSale: false,
    });
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();

    if (selectedBooks.length === 0) {
      alert("Please select at least one book");
      return;
    }

    try {
      let requestData = {
        bookIds: selectedBooks,
        operation: bulkOperation,
        data: {},
      };

      switch (bulkOperation) {
        case "applyDiscount":
          if (!bulkFormData.discountPercentage) {
            alert("Please enter a discount percentage");
            return;
          }
          requestData.data = {
            discountPercentage: Number(bulkFormData.discountPercentage),
            saleStartDate: bulkFormData.saleStartDate || undefined,
            saleEndDate: bulkFormData.saleEndDate || undefined,
          };
          break;

        case "setSalePrice":
          if (!bulkFormData.salePrice) {
            alert("Please enter a sale price");
            return;
          }
          requestData.data = {
            salePrice: Number(bulkFormData.salePrice),
            saleStartDate: bulkFormData.saleStartDate || undefined,
            saleEndDate: bulkFormData.saleEndDate || undefined,
          };
          break;

        case "toggleFlashSale":
          requestData.data = {
            isFlashSale: bulkFormData.isFlashSale,
          };
          break;

        case "clearSales":
          // Confirmation handled by Clear Sales button
          break;

        default:
          break;
      }

      await api.put("/books/bulk-update", requestData);

      toast.success(`Successfully updated ${selectedBooks.length} book(s)`);
      closeBulkModal();
      setSelectedBooks([]);
      fetchDashboardData();
    } catch (error) {
      console.error("Bulk update error:", error);
      console.error("Error response:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update books. Please try again.";
      toast.error(`Error: ${errorMessage}`);
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
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
              activeTab === "users"
                ? "bg-primary-50 text-primary-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="w-5 h-5 mr-3" /> Users
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Dashboard Content */}
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
                  onClick={() => {
                    const lowStockBooks = books.filter(
                      (b) => b.stock <= 10 && b.stock > 0
                    );
                    if (lowStockBooks.length > 0) {
                      setBookListModalTitle(
                        `Low Stock Items (${lowStockBooks.length})`
                      );
                      setBookListModalBooks(lowStockBooks);
                      setIsBookListModalOpen(true);
                    } else {
                      toast.info("No low stock items");
                    }
                  }}
                />
                <StatCard
                  label="Active Sales"
                  value={
                    books.filter((b) => b.salePrice || b.isFlashSale).length
                  }
                  icon={Tag}
                  bg="bg-green-50"
                  color="text-green-600"
                  onClick={() => {
                    const activeSalesBooks = books.filter(
                      (b) => b.salePrice || b.isFlashSale
                    );
                    if (activeSalesBooks.length > 0) {
                      setBookListModalTitle(
                        `Active Sales (${activeSalesBooks.length})`
                      );
                      setBookListModalBooks(activeSalesBooks);
                      setIsBookListModalOpen(true);
                    } else {
                      toast.info("No active sales");
                    }
                  }}
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

          {activeTab === "users" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Users</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Joined
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {u.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {u.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                u.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            {u.email !== user?.email && (
                              <button
                                onClick={() =>
                                  handleUserRoleUpdate(
                                    u._id,
                                    u.role === "admin" ? "customer" : "admin"
                                  )
                                }
                                className={`font-medium ${
                                  u.role === "admin"
                                    ? "text-red-600 hover:text-red-900"
                                    : "text-blue-600 hover:text-blue-900"
                                }`}
                              >
                                {u.role === "admin"
                                  ? "Revoke Admin"
                                  : "Make Admin"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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

              {/* Bulk Actions Toolbar */}
              {selectedBooks.length > 0 && (
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedBooks.length} book(s) selected
                    </span>
                    <button
                      onClick={() => setSelectedBooks([])}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear selection
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openBulkModal("applyDiscount")}
                      className="text-xs"
                    >
                      <Tag className="w-4 h-4 mr-1" />
                      Apply Discount
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openBulkModal("setSalePrice")}
                      className="text-xs"
                    >
                      <DollarSign className="w-4 h-4 mr-1" />
                      Set Sale Price
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openBulkModal("toggleFlashSale")}
                      className="text-xs"
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Flash Sale
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (selectedBooks.length === 0) {
                          toast.error("Please select books first");
                          return;
                        }

                        // Show custom confirmation modal
                        setConfirmMessage(
                          `Clear all sales from ${selectedBooks.length} selected book(s)?`
                        );
                        setConfirmAction(() => async () => {
                          try {
                            await api.put("/books/bulk-update", {
                              bookIds: selectedBooks,
                              operation: "clearSales",
                              data: {},
                            });
                            toast.success(
                              `Successfully cleared sales from ${selectedBooks.length} book(s)`
                            );
                            setSelectedBooks([]);
                            fetchDashboardData();
                          } catch (error) {
                            console.error("Bulk update error:", error);
                            console.error(
                              "Error response:",
                              error.response?.data
                            );
                            const errorMessage =
                              error.response?.data?.message ||
                              error.message ||
                              "Failed to clear sales. Please try again.";
                            toast.error(`Error: ${errorMessage}`);
                          }
                        });
                        setIsConfirmModalOpen(true);
                      }}
                      className="text-xs text-red-600 hover:text-red-700 border-red-200"
                    >
                      <TrendingDown className="w-4 h-4 mr-1" />
                      Clear Sales
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            checked={
                              selectedBooks.length === books.length &&
                              books.length > 0
                            }
                            onChange={handleSelectAll}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </th>
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
                            <input
                              type="checkbox"
                              checked={selectedBooks.includes(book._id)}
                              onChange={() => handleSelectBook(book._id)}
                              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                          </td>
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

              {/* Bulk Sale Modal */}
              {isBulkModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">
                          {bulkOperation === "applyDiscount" &&
                            "Apply Discount"}
                          {bulkOperation === "setSalePrice" && "Set Sale Price"}
                          {bulkOperation === "toggleFlashSale" &&
                            "Toggle Flash Sale"}
                        </h3>
                        <button
                          onClick={closeBulkModal}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedBooks.length} book(s) selected
                      </p>
                    </div>

                    <form onSubmit={handleBulkSubmit} className="p-6 space-y-4">
                      {bulkOperation === "applyDiscount" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Discount Percentage (%)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={bulkFormData.discountPercentage}
                            onChange={(e) =>
                              setBulkFormData({
                                ...bulkFormData,
                                discountPercentage: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="e.g., 20"
                            required
                          />
                        </div>
                      )}

                      {bulkOperation === "setSalePrice" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sale Price (Rs.)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={bulkFormData.salePrice}
                            onChange={(e) =>
                              setBulkFormData({
                                ...bulkFormData,
                                salePrice: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="e.g., 500"
                            required
                          />
                        </div>
                      )}

                      {bulkOperation === "toggleFlashSale" && (
                        <div>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={bulkFormData.isFlashSale}
                              onChange={(e) =>
                                setBulkFormData({
                                  ...bulkFormData,
                                  isFlashSale: e.target.checked,
                                })
                              }
                              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              Enable Flash Sale
                            </span>
                          </label>
                        </div>
                      )}

                      {(bulkOperation === "applyDiscount" ||
                        bulkOperation === "setSalePrice") && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sale Start Date (Optional)
                            </label>
                            <input
                              type="date"
                              value={bulkFormData.saleStartDate}
                              onChange={(e) =>
                                setBulkFormData({
                                  ...bulkFormData,
                                  saleStartDate: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sale End Date (Optional)
                            </label>
                            <input
                              type="date"
                              value={bulkFormData.saleEndDate}
                              onChange={(e) =>
                                setBulkFormData({
                                  ...bulkFormData,
                                  saleEndDate: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                        </>
                      )}

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={closeBulkModal}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                          Apply to {selectedBooks.length} Book(s)
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
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
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center">
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
                                {order.shippingAddress?.name ||
                                  order.user?.name ||
                                  "N/A"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {order.user?.email || "No Email"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {order.shippingAddress?.phone ||
                                  order.user?.phone ||
                                  "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {order.items?.length || 0} item(s)
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900">
                                Rs. {(order.totalAmount || 0).toLocaleString()}
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
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setIsOrderModalOpen(true);
                                  }}
                                  className="text-primary-600 hover:text-primary-900 bg-primary-50 px-3 py-1 rounded-lg text-sm font-medium"
                                >
                                  Details
                                </button>
                                {order.receiptImage && (
                                  <button
                                    onClick={() => {
                                      setSelectedOrder(order);
                                      setIsReceiptModalOpen(true);
                                    }}
                                    className="text-gray-600 hover:text-primary-600 bg-gray-50 hover:bg-primary-50 px-2 py-1 rounded-lg text-sm font-medium transition-colors"
                                    title="View Receipt"
                                  >
                                    <FileText className="w-4 h-4" />
                                  </button>
                                )}
                                <select
                                  className="text-sm border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 px-3 py-1.5"
                                  value={order.status}
                                  onChange={(e) =>
                                    handleOrderStatus(order._id, e.target.value)
                                  }
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>
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

      {/* Receipt Modal */}
      {isReceiptModalOpen && selectedOrder && selectedOrder.receiptImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsReceiptModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 h-full overflow-auto flex items-center justify-center bg-gray-100/50">
              <img
                src={selectedOrder.receiptImage}
                alt="Payment Receipt"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-white p-4 border-t border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Receipt for Order #{selectedOrder._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-xs text-gray-500">
                  Uploaded on{" "}
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
              <a
                href={selectedOrder.receiptImage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Open Original
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order Details
                </h2>
                <p className="text-sm text-gray-500">
                  ID: #{selectedOrder._id.toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Status Section */}
              <div className="flex flex-wrap gap-4 justify-between items-center bg-gray-50 p-4 rounded-xl">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Status</p>
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded-full ${
                      selectedOrder.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : selectedOrder.status === "processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedOrder.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-lg font-bold text-primary-600">
                    Rs. {(selectedOrder.totalAmount || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Customer Information
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-900">
                      <span className="text-gray-500 w-20 inline-block">
                        Name:
                      </span>
                      {selectedOrder.shippingAddress?.name ||
                        selectedOrder.user?.name ||
                        "N/A"}
                    </p>
                    <p className="text-sm text-gray-900">
                      <span className="text-gray-500 w-20 inline-block">
                        Email:
                      </span>
                      {selectedOrder.user?.email || "N/A"}
                    </p>
                    <p className="text-sm text-gray-900">
                      <span className="text-gray-500 w-20 inline-block">
                        Phone:
                      </span>
                      {selectedOrder.shippingAddress?.phone ||
                        selectedOrder.user?.phone ||
                        "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Shipping Address
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-600 leading-relaxed">
                    {selectedOrder.shippingAddress ? (
                      <>
                        <p>{selectedOrder.shippingAddress.street}</p>
                        <p>
                          {selectedOrder.shippingAddress.city},{" "}
                          {selectedOrder.shippingAddress.province},{" "}
                          {selectedOrder.shippingAddress.postalCode}
                        </p>
                        <p>{selectedOrder.shippingAddress.country}</p>
                      </>
                    ) : (
                      <p>No shipping address provided</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Ordered Items
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {item.book?.coverImage && (
                                <img
                                  src={item.book.coverImage}
                                  alt=""
                                  className="h-10 w-8 object-cover rounded mr-3"
                                />
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                  {item.book?.title || "Unknown Book"}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                  {item.book?.author}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-gray-500">
                            Rs. {item.price?.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan="3"
                          className="px-4 py-3 text-right text-sm font-bold text-gray-900"
                        >
                          Total:
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-bold text-primary-600">
                          Rs. {selectedOrder.total?.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Payment Receipt */}
              {selectedOrder.receiptImage && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Payment Receipt
                  </h3>
                  <div className="border border-gray-200 rounded-lg p-2 bg-gray-50 inline-block">
                    <a
                      href={selectedOrder.receiptImage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={selectedOrder.receiptImage}
                        alt="Payment Receipt"
                        className="max-h-64 rounded shadow-sm hover:opacity-95 transition-opacity"
                      />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Book List Modal */}
      {isBookListModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                {bookListModalTitle}
              </h3>
              <button
                onClick={() => setIsBookListModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookListModalBooks.map((book) => (
                  <div
                    key={book._id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-16 h-20 bg-white rounded overflow-hidden border border-gray-200">
                        {book.image ? (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sinhala font-bold text-sm text-gray-900 mb-1 line-clamp-2">
                          {book.titleSinhala || book.title}
                        </h4>
                        {book.title && book.titleSinhala && (
                          <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                            {book.title}
                          </p>
                        )}
                        <div className="space-y-1">
                          {book.stock !== undefined && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">
                                Stock:
                              </span>
                              <span
                                className={`text-xs font-medium ${
                                  book.stock <= 5
                                    ? "text-red-600"
                                    : book.stock <= 10
                                    ? "text-orange-600"
                                    : "text-green-600"
                                }`}
                              >
                                {book.stock}
                              </span>
                            </div>
                          )}
                          {(book.salePrice || book.price) && (
                            <div className="flex items-center gap-2">
                              {book.salePrice ? (
                                <>
                                  <span className="text-sm font-bold text-orange-600">
                                    Rs. {book.salePrice}
                                  </span>
                                  <span className="text-xs text-gray-400 line-through">
                                    Rs. {book.price}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm font-medium text-gray-900">
                                  Rs. {book.price}
                                </span>
                              )}
                            </div>
                          )}
                          {book.isFlashSale && (
                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded">
                              FLASH SALE
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <Button
                onClick={() => setIsBookListModalOpen(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Confirm Action
              </h3>
              <p className="text-gray-600 mb-6">{confirmMessage}</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsConfirmModalOpen(false);
                    setConfirmAction(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (confirmAction) {
                      confirmAction();
                    }
                    setIsConfirmModalOpen(false);
                    setConfirmAction(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, bg, onClick }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all ${
      onClick ? "cursor-pointer hover:shadow-md hover:border-gray-200" : ""
    }`}
    onClick={onClick}
  >
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
