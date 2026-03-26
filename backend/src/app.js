const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const membersRoutes = require("./routes/members.routes");
const tasksRoutes = require("./routes/tasks.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors(
    allowedOrigins.length
      ? { origin: allowedOrigins }
      : undefined
  )
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/members", membersRoutes);
app.use("/api/tasks", tasksRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SquaresTech Team Directory API" });
});

// Error handling
app.use(errorHandler);

module.exports = app;
