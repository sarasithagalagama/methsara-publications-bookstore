# Methsara Publications Bookstore

A modern, full-stack e-commerce platform for educational books, built with the MERN stack and deployed on Vercel.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://methsarapublications.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

## 📖 About

Methsara Publications Bookstore is a comprehensive e-commerce solution designed for the Sri Lankan educational market. The platform provides a seamless shopping experience for students, parents, and educators to browse and purchase educational materials.

## ✨ Features

- **User Authentication**: Secure login with Google OAuth 2.0 and JWT-based session management
- **Product Catalog**: Browse books by category, grade, and subject with advanced filtering
- **Shopping Cart**: Add items to cart with real-time price calculations
- **Wishlist**: Save favorite books for later
- **Secure Checkout**: Complete purchase flow with order management
- **Admin Dashboard**: Comprehensive admin panel for inventory and order management
- **Bulk Operations**: Efficient mass updates for pricing and inventory
- **Contact Form**: Integrated contact system with email notifications
- **Responsive Design**: Mobile-first design optimized for all devices
- **Image Management**: Cloud-based image storage with Vercel Blob

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 - UI library
- **Vite** 5.0 - Build tool and dev server
- **Tailwind CSS** 3.4 - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.0 - ODM for MongoDB
- **JWT** - Authentication tokens
- **Google Auth Library** - OAuth 2.0 integration
- **Nodemailer** - Email service
- **Vercel Blob** - File storage

### Deployment
- **Vercel** - Serverless deployment platform
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
methsara-publications-bookstore/
├── client/                 # Frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Backend application
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── index.js          # Server entry point
├── api/                  # Vercel serverless functions
└── vercel.json          # Vercel configuration
```

## 🔑 Key Features Explained

### Authentication System
- JWT-based authentication with HttpOnly cookies
- Google OAuth 2.0 integration for social login
- Role-based access control (Admin/User)

### Admin Dashboard
- Product management (CRUD operations)
- Bulk pricing updates
- Order management
- Image upload with Vercel Blob

### Shopping Experience
- Advanced product filtering
- Real-time cart updates
- Wishlist functionality
- Responsive checkout process

## 👤 Author

**Sarasitha Galagama**

- GitHub: [@sarasithagalagama](https://github.com/sarasithagalagama)
