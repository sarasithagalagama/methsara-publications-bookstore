import api from "./api";

// Create order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Get user's orders
export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

// Get single order
export const getOrder = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Upload receipt
export const uploadReceipt = async (orderId, receiptUrl) => {
  const response = await api.put(`/orders/${orderId}/receipt`, { receiptUrl });
  return response.data;
};

// Get all orders (Admin only)
export const getAllOrders = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  });

  const response = await api.get(`/orders/all?${params.toString()}`);
  return response.data;
};

// Verify payment (Admin only)
export const verifyPayment = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/verify`);
  return response.data;
};

// Update order status (Admin only)
export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data;
};

// Upload receipt file to Vercel Blob
export const uploadReceiptFile = async (file) => {
  const formData = new FormData();
  formData.append("receipt", file);

  const response = await api.post("/upload/receipt", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
