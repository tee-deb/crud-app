const express = require("express");
dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const { connectDB } = require("./config/db");

dotenv.config();

// middleware
const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

// port
const port = process.env.PORT || 5004;

// routes
app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  res.send("hello from node api");
});

app.listen(port, async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    console.log("Database connection established");
    console.log(`Server is listening on http://localhost:${port}`);
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error.message);
  }
});
