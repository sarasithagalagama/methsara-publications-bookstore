# 📚 Methsara Publications Bookstore

A professional, full-featured E-commerce platform dedicated to providing educational resources for Sri Lankan students. Built with the MERN stack and localized for the Sri Lankan market.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Deployment](https://img.shields.io/badge/Deployment-Vercel-black)

## 🚀 Key Features

### 🛍️ Customer Experience
- **Localized Shopping**: Browser books by Grade (6-11) and Advanced Level streams with Sinhala titles.
- **Smart Search**: Filter books by category, grade, and subject.
- **Seamless Checkout**: 
  - Standardized Sri Lankan address format (District selection).
  - Multiple payment methods: Card, Bank Transfer, Cash on Delivery.
- **Authentication**:
  - **Google Login** for one-click access.
  - Traditional Email/Password registration.
- **Order Tracking**: Real-time status updates (Pending → Paid → Shipped).

### 👮‍♂️ Admin Dashboard
- **Inventory Management**: Create, update, and manage book stock with image previews.
- **Order Management**: View and process customer orders.
- **Payment Verification**: Review uploaded bank deposit receipts directly from the dashboard.
- **Analytics**: Track sales performance and user growth.

### 🛠️ Technical Highlights
- **Architecture**: Monorepo structure with separated Client (Vite) and Server (Express).
- **Security**: 
  - JWT Authentication using HttpOnly cookies (or Authorization header).
  - Google OAuth 2.0 Integration.
  - Password hashing with Bcrypt.
- **Storage**: Vercel Blob for high-performance image storage (Book covers & Receipts).
- **UI/UX**: Responsive design using **Tailwind CSS**, Lucide Icons, and React Hot Toast.

---

## 📋 Tech Stack

| Domain | Technologies |
|--------|--------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Context API, Axios, Lucide React, Google OAuth |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose), Google Auth Library |
| **Database** | MongoDB Atlas |
| **Storage** | Vercel Blob |
| **Deployment** | Vercel (Serverless) |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Connection String
- Vercel Account (for Blob Storage)
- Google Cloud Console Project (for OAuth)

### 1. Clone & Install
This project uses a monorepo structure. You can install dependencies for both client and server from the root.

```bash
git clone https://github.com/sarasithagalagama/methsara-publications-bookstore.git
cd methsara-publications-bookstore

# Install all dependencies (Root, Client, Server)
npm run install:all
```

### 2. Environment Variables

Create `.env` file in **server/** directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
GOOGLE_CLIENT_ID=your_google_client_id
CLIENT_URL=http://localhost:5173
```

Create `.env` file in **client/** directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Run Locally
Start both the backend and frontend concurrently:

```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 📦 Deployment (Vercel)

This project is configured for **Vercel** monorepo deployment.

1.  **Push to GitHub**.
2.  **Import Project** in Vercel.
3.  **Environment Variables**: Add the following in Vercel Project Settings:
    - `MONGODB_URI`
    - `JWT_SECRET`
    - `BLOB_READ_WRITE_TOKEN`
    - `GOOGLE_CLIENT_ID`
    - `VITE_API_URL` (Set to `/api`)
    - `CLIENT_URL` (Your Vercel domain)
4.  **Deploy**! Vercel will automatically build the Frontend (Vite) and Backend (Express) based on `vercel.json`.

---

## 📂 Project Structure

```
methsara-publications-bookstore/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth & Cart State
│   │   ├── pages/         # Application Pages (Shop, Cart, Admin...)
│   │   └── services/      # API Integrations
│   └── package.json
├── server/                # Node.js Backend (Express)
│   ├── controllers/       # Business Logic
│   ├── models/           # Mongoose Schemas (User, Book, Order)
│   ├── routes/           # API Endpoints
│   └── server.js         # Entry Point
├── api/                  # Vercel Serverless Function Entry
└── vercel.json           # Deployment Configuration
```

---

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Copyright © 2026 Methsara Publications. All rights reserved.

**Built with ❤️ for Sri Lankan Students**
