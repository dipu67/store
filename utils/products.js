require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("connected products data");
});

const productSchema = mongoose.Schema({
  productName: String,
  description: String,
  productIamge: String,
  price: Number,
});

module.exports = mongoose.model("product", productSchema);
