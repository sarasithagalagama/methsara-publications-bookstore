# 📚 Methsara Publications Bookstore

<div align="center">

![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge&logo=vercel)
![Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/UI-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Framework-Express.js-000000?style=flat-square&logo=express)](https://expressjs.com/)

A high-performance, localization-first E-commerce platform engineered for the Sri Lankan educational market. Built on a scalable **Monorepo Architecture** and deployed on **Vercel Serverless Infrastrucure**.

[View Demo](https://methsarapublications.vercel.app/) · [Report Bug](https://github.com/sarasithagalagama/methsara-publications-bookstore/issues) · [Request Feature](https://github.com/sarasithagalagama/methsara-publications-bookstore/issues)

</div>

---

## 🏗️ Architecture

The application follows a **Monolithic Repository (Monorepo)** pattern, orchestrating decoupled client and server environments that converge during deployment via Vercel's serverless runtime.

```mermaid
graph TD
    Client[Client (Vite/React)] -->|REST API| API[Server API (Express)]
    Client -->|Uploads| Blob[Vercel Blob Storage]
    API -->|Auth/Data| Atlas[(MongoDB Atlas)]
    API -->|Auth| Google[Google OAuth 2.0]
    API -->|SMTP| Email[Email Service]
    
    subgraph Vercel Infrastructure
    Client
    API
    Blob
    end
```

### Key Architectural Decisions
- **Hybrid Rendering**: Client-Side Rendering (CSR) via Vite for dynamic interactivity, backed by static asset serving.
- **Serverless API Adaptation**: Express.js server adapted for Vercel Serverless Functions (`/api/*`), ensuring zero-cold-start latency optimization.
- **Optimized Storage**: Utilization of Vercel Blob for high-throughput image delivery (Edge Network Caching).
- **Stateless Authentication**: JWT-based auth flow suitable for horizontal scaling.

---

## 🚀 Technical Highlights & "Under the Hood"

### 🛡️ Secure Authentication Flow
Implemented a robust **JWT (JSON Web Token)** strategy.
1.  **Google OAuth 2.0**: ID Tokens verified server-side using `google-auth-library`.
2.  **Session Management**: 
    - `HttpOnly` cookie fallback for maximum security against XSS.
    - Authorization Header `Bearer <token>` support for API flexibility.
3.  **Role-Based Access Control (RBAC)**: Middleware-level protection for Admin routes.

### ⚡ Bulk Operations Engine
A sophisticated algorithm for handling mass inventory updates (O(n) complexity optimized):
- **Batch Processing**: MongoDB `bulkWrite` operations for atomic updates.
- **Transactional Integrity**: Updates either succeed completely or roll back.
- **Capabilities**:
    - Percentage-based dynamic pricing calculation.
    - Date-range validation for temporal sales (Flash Sales).
    - Status toggling (Stock visibility).

### 🎨 UI/UX Optimization
- **Tailwind JIT**: Just-In-Time compilation for minimal CSS bundle size.
- **Lucide Icons**: Tree-shakeable SVG icons.
- **Mobile-First Grid System**: Responsive layouts handling 2-column (mobile) to 5-column (4k) grids.
- **Optimistic Updates**: Immediate UI feedback using `react-hot-toast` while background requests process.

---

## 🛠️ Tech Stack Deep Dive

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| **Frontend** | React | ^18.2 | Component-based architecture, Virtual DOM |
| **Build Tool** | Vite | ^5.0 | ES modules based, HMR, blistering fast builds |
| **Styling** | Tailwind CSS | ^3.4 | Utility-first, standardized design system |
| **State** | Context API | - | Built-in global state without Redux overhead |
| **Backend** | Express | ^4.18 | Unopinionated, flexible middleware ecosystem |
| **Database** | Mongoose | ^8.0 | Schema-based modeling, validation, type casting |
| **Storage** | Vercel Blob | SDK | Edge-cached asset delivery |
| **Deploy** | Vercel | - | Zero-config CI/CD, global CDN |

---

## ⚙️ Local Development Setup

### prerequisites
- Node.js `v18.x` (LTS recommended)
- MongoDB Atlas Cluster
- Vercel Account (Blob Storage)

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/sarasithagalagama/methsara-publications-bookstore.git

# Monorepo install (Roots + Sub-packages)
npm run install:all
```

### 2. Environment Configuration
Configure your runtime environment.

**Server (`server/.env`):**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
JWT_SECRET=<32_byte_random_string>
BLOB_READ_WRITE_TOKEN=<vercel_blob_token>
GOOGLE_CLIENT_ID=<gcp_client_id>
CLIENT_URL=http://localhost:5173

# SMTP Config
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=bot@methsara.lk
SMTP_PASSWORD=<app_password>
```

**Client (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=<gcp_client_id>
```

### 3. Ignition
Launch concurrent development servers.

```bash
npm run dev
# 🚀 Client: http://localhost:5173
# ⚙️ Server: http://localhost:5000
```

---

## 📂 Monorepo Structure

```bash
root/
├── client/                 # SPA Frontend
│   ├── src/
│   │   ├── services/      # Axios Interceptor Pattern
│   │   ├── context/       # React Context Providers
│   │   └── hooks/         # Custom React Hooks
│   └── vite.config.js     # Build Configuration
├── server/                # REST API
│   ├── controllers/       # Request Handlers
│   ├── middleware/        # Auth, Error Handling
│   ├── models/            # Mongoose Schemas
│   └── utils/             # Helper Functions
└── vercel.json           # Serverless Routing Config
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guidelines](CONTRIBUTING.md) for details on code style, commit conventions, and pull request processes.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/sarasithagalagama">Sarasitha Galagama</a></sub>
</div>
