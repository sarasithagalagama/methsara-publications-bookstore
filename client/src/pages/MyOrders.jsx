import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { format } from "date-fns";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start shopping to see your orders here.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-500 hover:bg-primary-600"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">
                      Order Placed:{" "}
                      <span className="font-medium text-gray-900">
                        {format(new Date(order.createdAt), "MMMM d, yyyy")}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Order ID:{" "}
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

                {/* Items */}
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

                  {/* Actions / Details */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-500">
                      Payment Method:{" "}
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
    </div>
  );
};

export default MyOrders;
