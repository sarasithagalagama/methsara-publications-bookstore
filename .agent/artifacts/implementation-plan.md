# Methsara Publications Bookstore - Implementation Plan

## Project Overview
A full-stack MERN (MongoDB, Express, React, Node.js) bookstore application with JWT authentication, manual payment verification, and distinct user roles.

---

## Phase 1: Project Setup & Architecture

### 1.1 Initialize Project Structure
```
methsara-publications-bookstore/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth & state management
│   │   ├── utils/         # Helper functions
│   │   ├── services/      # API calls
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── server/                # Node.js + Express backend
│   ├── config/           # DB & environment config
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & validation
│   ├── controllers/      # Business logic
│   └── server.js
├── api/                  # Vercel serverless functions
│   └── index.js
├── vercel.json          # Vercel deployment config
└── .env.example
```

### 1.2 Technology Stack
- **Frontend**: React 18 + Vite, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT with role-based access (customer/admin)
- **File Storage**: Vercel Blob (receipt images)
- **Deployment**: Vercel

---

## Phase 2: Backend Development

### 2.1 Database Models

#### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['customer', 'admin']),
  phone: String,
  address: Object,
  createdAt: Date
}
```

#### Book Model
```javascript
{
  title: String,
  author: String,
  category: String (enum: ['Grade 6-11', 'Advanced Level']),
  grade: String,
  subject: String,
  price: Number,
  description: String,
  synopsis: String,
  coverImage: String (3D cover URL),
  stock: Number,
  isbn: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Order Model
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    book: ObjectId (ref: Book),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String (enum: ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered']),
  shippingAddress: Object,
  receiptImage: String (Vercel Blob URL),
  paymentVerifiedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2.2 API Endpoints

#### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user (returns JWT)
- `GET /me` - Get current user (protected)

#### Book Routes (`/api/books`)
- `GET /` - Get all books (public, with filters)
- `GET /:id` - Get single book (public)
- `POST /` - Create book (admin only)
- `PUT /:id` - Update book (admin only)
- `DELETE /:id` - Delete book (admin only)

#### Order Routes (`/api/orders`)
- `POST /` - Create order (customer only)
- `GET /my-orders` - Get user's orders (customer only)
- `GET /:id` - Get single order (owner or admin)
- `PUT /:id/receipt` - Upload receipt (customer only)
- `GET /all` - Get all orders (admin only)
- `PUT /:id/verify` - Verify payment (admin only)
- `PUT /:id/status` - Update order status (admin only)

#### Upload Routes (`/api/upload`)
- `POST /receipt` - Upload receipt to Vercel Blob (customer only)

### 2.3 Middleware
- **authMiddleware**: Verify JWT token
- **roleMiddleware**: Check user role (admin/customer)
- **errorHandler**: Global error handling

---

## Phase 3: Frontend Development

### 3.1 Public Pages

#### Home Page (`/`)
**Sections:**
1. **Hero Section**
   - Headline: "Empowering Sri Lankan Students Since 2015"
   - Subheading: "Quality Educational Books for Grades 6-13"
   - CTA: "Browse Books" → /shop
   - Background: Gradient with book imagery

2. **Why Choose Us**
   - Grid of 4 features:
     - Expert Authors
     - Comprehensive Coverage
     - Affordable Pricing
     - Trusted by Thousands

3. **Categories**
   - Two main categories with images:
     - Grade 6-11 Books
     - Advanced Level Books
   - Click to filter in /shop

#### About Page (`/about`)
**Sections:**
1. **Our Story**
   - Founded in 2015
   - Mission to provide quality education materials
   - Team of experienced educators

2. **Our Mission**
   - Accessible education for all Sri Lankan students
   - High-quality, curriculum-aligned content
   - Supporting academic excellence

#### Shop Page (`/shop`)
**Features:**
- Grid view of books (responsive: 1/2/3/4 columns)
- Filters:
  - Category (Grade 6-11 / Advanced Level)
  - Grade (6, 7, 8, 9, 10, 11, 12, 13)
  - Subject
  - Price range
- Search functionality
- "Add to Cart" button on each card

#### Product Details Page (`/product/:id`)
**Features:**
- 3D book cover (large image)
- Title, Author, Grade, Subject
- Price and stock availability
- Synopsis (expandable)
- Quantity selector
- "Add to Cart" button
- Related books section

### 3.2 Customer Pages (Protected)

#### Cart Page (`/cart`)
- List of cart items
- Quantity adjustment
- Remove items
- Total calculation
- "Proceed to Checkout" button

#### Checkout Page (`/checkout`)
- Shipping address form
- Order summary
- Payment instructions:
  - Bank details for deposit
  - "Place Order" button (creates order with "Pending" status)

#### My Orders Page (`/my-orders`)
- Table/cards of user's orders
- Order details: ID, Date, Total, Status
- For "Pending" orders:
  - File uploader for bank deposit slip
  - "Upload Receipt" button
- Order tracking timeline

### 3.3 Admin Pages (Protected - Admin Only)

#### Admin Dashboard (`/admin`)
- Overview cards:
  - Total Orders
  - Pending Payments
  - Total Revenue
  - Books in Stock

#### Inventory Management (`/admin/inventory`)
- Table of all books
- CRUD operations:
  - Create: Modal/form for new book
  - Read: Display all books with search/filter
  - Update: Edit modal/form
  - Delete: Confirmation dialog
- Upload book cover images

#### Order Management (`/admin/orders`)
- Table of all orders with filters:
  - Status (Pending, Paid, Processing, Shipped, Delivered)
  - Date range
  - Customer name
- For each order:
  - View order details
  - View uploaded receipt (if available)
  - "Verify Payment" button (changes status to "Paid")
  - Status dropdown to update (Processing/Shipped/Delivered)

### 3.4 Shared Components

#### Navbar
- Logo: "Methsara Publications"
- Links: Home, About, Shop
- Right side:
  - Cart icon with badge (item count)
  - User menu (if logged in):
    - My Orders
    - Admin Dashboard (if admin)
    - Logout
  - Login/Register buttons (if not logged in)

#### Footer
- Company info
- Quick links
- Contact information
- Social media links
- Copyright notice

#### Auth Components
- Login Modal/Page
- Register Modal/Page
- Protected Route wrapper

---

## Phase 4: Authentication & Authorization

### 4.1 JWT Implementation
- Generate token on login/register
- Store token in localStorage/httpOnly cookie
- Include token in API requests (Authorization header)
- Verify token on protected routes

### 4.2 Role-Based Access Control
- Customer role:
  - Can place orders
  - Can view own orders
  - Can upload receipts
- Admin role:
  - All customer permissions
  - Can manage books (CRUD)
  - Can view all orders
  - Can verify payments
  - Can update order status

---

## Phase 5: File Upload & Storage

### 5.1 Vercel Blob Integration
- Install `@vercel/blob` package
- Configure blob storage in Vercel dashboard
- Create upload endpoint for receipts
- Store blob URL in order document

### 5.2 Upload Flow
1. Customer uploads receipt from /my-orders
2. Frontend sends file to `/api/upload/receipt`
3. Backend uploads to Vercel Blob
4. Blob URL saved to order's `receiptImage` field
5. Admin can view receipt in order management

---

## Phase 6: Deployment Configuration

### 6.1 Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

### 6.2 Environment Variables
**Backend (.env):**
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
BLOB_READ_WRITE_TOKEN=vercel_blob_token
NODE_ENV=production
```

**Frontend (.env):**
```
VITE_API_URL=https://your-domain.vercel.app/api
```

### 6.3 Serverless API Entry Point (`api/index.js`)
- Import Express app from server
- Export as serverless function
- Handle all API routes

---

## Phase 7: Content Integration

### 7.1 Home Page Content
**Hero:**
- Headline: "Empowering Sri Lankan Students Since 2015"
- Subheading: "Discover comprehensive educational books for Grades 6-13, crafted by expert educators"

**Why Choose Us:**
1. **Expert Authors** - Written by experienced teachers and subject specialists
2. **Comprehensive Coverage** - Complete syllabus coverage aligned with Sri Lankan curriculum
3. **Affordable Pricing** - Quality education materials at student-friendly prices
4. **Trusted by Thousands** - Over 10,000 students have benefited from our publications

**Categories:**
- Grade 6-11 Books (O/L preparation)
- Advanced Level Books (A/L preparation)

### 7.2 About Page Content
**Our Story:**
"Founded in 2015, Methsara Publications emerged from a simple vision: to make quality educational materials accessible to every Sri Lankan student. What started as a small initiative by a group of passionate educators has grown into a trusted name in educational publishing."

**Our Mission:**
"We are committed to empowering students through comprehensive, curriculum-aligned educational materials. Our books are designed to simplify complex concepts, enhance understanding, and build confidence in students preparing for O/L and A/L examinations."

---

## Phase 8: Testing & Quality Assurance

### 8.1 Testing Checklist
- [ ] User registration and login
- [ ] JWT token generation and validation
- [ ] Role-based access control
- [ ] Book CRUD operations (admin)
- [ ] Shop page filters and search
- [ ] Add to cart functionality
- [ ] Checkout and order creation
- [ ] Receipt upload to Vercel Blob
- [ ] Admin order verification
- [ ] Order status updates
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] API error handling
- [ ] Form validation

### 8.2 Security Checklist
- [ ] Password hashing (bcrypt)
- [ ] JWT secret protection
- [ ] Input validation and sanitization
- [ ] Protected routes (frontend & backend)
- [ ] CORS configuration
- [ ] Rate limiting on API endpoints
- [ ] Secure file upload validation

---

## Phase 9: Launch Preparation

### 9.1 Pre-Launch Tasks
1. Seed database with initial books
2. Create admin account
3. Test complete user journey (browse → order → payment → verification)
4. Configure custom domain (if applicable)
5. Set up monitoring and error tracking
6. Prepare user documentation

### 9.2 Post-Launch Tasks
1. Monitor server logs
2. Track user registrations and orders
3. Gather user feedback
4. Plan feature enhancements

---

## Implementation Timeline

### Week 1: Foundation
- Day 1-2: Project setup, folder structure, dependencies
- Day 3-4: Database models and backend API structure
- Day 5-7: Authentication system (JWT, login, register)

### Week 2: Core Features
- Day 8-10: Book management (CRUD, admin panel)
- Day 11-12: Shop page with filters
- Day 13-14: Cart and checkout flow

### Week 3: Payment & Orders
- Day 15-16: Order creation and tracking
- Day 17-18: Vercel Blob integration for receipts
- Day 19-20: Admin order management and verification
- Day 21: Order status updates

### Week 4: Polish & Deploy
- Day 22-24: UI/UX refinement, responsiveness
- Day 25-26: Testing and bug fixes
- Day 27-28: Deployment configuration and launch
- Day 29-30: Post-launch monitoring and adjustments

---

## Key Features Summary

### Customer Features
✅ Browse books by category and grade
✅ Search and filter books
✅ View detailed book information
✅ Add books to cart
✅ Place orders
✅ Upload bank deposit slip
✅ Track order status

### Admin Features
✅ Manage book inventory (CRUD)
✅ View all orders
✅ View uploaded receipts
✅ Verify payments
✅ Update order status
✅ Dashboard analytics

### Technical Features
✅ JWT authentication with role-based access
✅ MongoDB Atlas database
✅ Vercel Blob file storage
✅ Responsive design (Tailwind CSS)
✅ Modern UI components (Shadcn UI)
✅ Serverless deployment (Vercel)

---

## Next Steps
1. Review and approve this implementation plan
2. Begin Phase 1: Project setup
3. Install dependencies and configure development environment
4. Start building backend API and database models
