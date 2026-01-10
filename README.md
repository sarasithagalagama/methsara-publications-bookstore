# Methsara Publications Bookstore

A full-stack MERN (MongoDB, Express, React, Node.js) bookstore application for Methsara Publications, featuring JWT authentication, manual payment verification, and role-based access control.

## 🚀 Features

### Customer Features
- ✅ Browse books by category (Grade 6-11, Advanced Level) and grade
- ✅ Search and filter books
- ✅ View detailed book information with 3D covers
- ✅ Add books to shopping cart
- ✅ Place orders with shipping information
- ✅ Upload bank deposit slip for payment verification
- ✅ Track order status in real-time

### Admin Features
- ✅ Manage book inventory (Create, Read, Update, Delete)
- ✅ View all customer orders
- ✅ View uploaded payment receipts
- ✅ Verify payments and update order status
- ✅ Dashboard with analytics

### Technical Features
- ✅ JWT authentication with role-based access (customer/admin)
- ✅ MongoDB Atlas database
- ✅ Vercel Blob file storage for receipts
- ✅ Responsive design with Tailwind CSS
- ✅ Modern UI components (Shadcn UI style)
- ✅ Serverless deployment ready (Vercel)

## 📋 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom components (Shadcn UI style)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt.js
- **File Storage**: Vercel Blob
- **File Upload**: Multer

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Vercel account (for Blob storage and deployment)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd methsara-publications-bookstore
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## 📁 Project Structure

```
methsara-publications-bookstore/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── ui/       # UI components (Button, Card, Input)
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   └── ... (more to be added)
│   │   ├── context/       # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── services/      # API service functions
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── bookService.js
│   │   │   └── orderService.js
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   │   └── db.js
│   ├── models/           # Mongoose schemas
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Order.js
│   ├── controllers/      # Business logic
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── orderController.js
│   │   └── uploadController.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── books.js
│   │   ├── orders.js
│   │   └── upload.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js         # Express app
│   └── package.json
├── api/                  # Vercel serverless functions
│   └── index.js
└── vercel.json          # Vercel deployment config
```

## 🔐 Authentication Flow

1. **Registration**: Users register with name, email, password, and optional address
2. **Login**: Users login with email and password
3. **JWT Token**: Server generates JWT token with user ID
4. **Token Storage**: Frontend stores token in localStorage
5. **Protected Routes**: Token sent in Authorization header for protected endpoints
6. **Role-Based Access**: Admin routes check for admin role in JWT payload

## 📦 Order & Payment Flow

1. **Browse & Add to Cart**: Customer browses books and adds to cart
2. **Checkout**: Customer provides shipping address and places order
3. **Order Created**: Order status set to "Pending"
4. **Bank Deposit**: Customer makes bank deposit
5. **Upload Receipt**: Customer uploads deposit slip photo via /my-orders
6. **Vercel Blob**: Receipt uploaded to Vercel Blob storage
7. **Admin Review**: Admin views receipt in order management
8. **Verify Payment**: Admin clicks "Verify Payment" → status changes to "Paid"
9. **Order Processing**: Admin updates status: Processing → Shipped → Delivered

## 🌐 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (Protected)

### Books (`/api/books`)
- `GET /` - Get all books (with filters)
- `GET /:id` - Get single book
- `POST /` - Create book (Admin only)
- `PUT /:id` - Update book (Admin only)
- `DELETE /:id` - Delete book (Admin only)

### Orders (`/api/orders`)
- `POST /` - Create order (Protected)
- `GET /my-orders` - Get user's orders (Protected)
- `GET /all` - Get all orders (Admin only)
- `GET /:id` - Get single order (Protected)
- `PUT /:id/receipt` - Upload receipt (Protected)
- `PUT /:id/verify` - Verify payment (Admin only)
- `PUT /:id/status` - Update order status (Admin only)

### Upload (`/api/upload`)
- `POST /receipt` - Upload receipt file (Protected)

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Set Environment Variables** in Vercel Dashboard:
- `MONGODB_URI`
- `JWT_SECRET`
- `BLOB_READ_WRITE_TOKEN`

3. **Deploy**:
```bash
vercel
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for development)
5. Get connection string and add to `.env`

### Vercel Blob Setup

1. Go to Vercel Dashboard → Storage
2. Create a new Blob store
3. Copy the `BLOB_READ_WRITE_TOKEN`
4. Add to environment variables

## 👤 Creating Admin User

To create an admin user, you can either:

1. **Via MongoDB**: Manually update a user's role to 'admin' in the database
2. **Via Registration**: Register normally, then update role in database

## 📝 Current Progress

✅ **Completed**:
- Backend API (100%)
- Database models
- Authentication system
- Frontend infrastructure
- Home page
- About page
- Navbar & Footer

🚧 **In Progress**:
- Shop page
- Product details page
- Cart & Checkout
- Customer dashboard
- Admin dashboard

## 🤝 Contributing

This is a private project for Methsara Publications.

## 📄 License

Copyright © 2026 Methsara Publications. All rights reserved.

## 📞 Support

For support, email info@methsarapublications.lk

---

**Built with ❤️ for Sri Lankan Students**
