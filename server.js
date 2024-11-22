import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

// Basic health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
