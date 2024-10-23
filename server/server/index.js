const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToMongo = require("./db/connection");
require("dotenv").config();

// Import route files
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");
// const amenityRoutes = require("./routes/amenityRoutes");
// const activityRoutes = require("./routes/activityRoutes");
// const paymentRoutes = require("./routes/paymentRoutes"); // Payment route

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/amenities", amenityRoutes);
// app.use("/api/activities", activityRoutes);
// app.use("/api/payments", paymentRoutes); // Register the payment routes

// Test route
app.get("/test", (req, res) => {
  res.json("Server is up and running!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});