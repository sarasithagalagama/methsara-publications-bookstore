const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.CLIENT_URL,
      ];
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow any Vercel deployment
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Mount routers
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/upload", require("./routes/upload"));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(
      `Server running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
