import api from "./api";

// Get all books with filters
export const getBooks = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  });

  const response = await api.get(`/books?${params.toString()}`);
  return response.data;
};

// Get single book
export const getBook = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Create book (Admin only)
export const createBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return response.data;
};

// Update book (Admin only)
export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

// Delete book (Admin only)
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
