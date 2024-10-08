require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("connected Admin");
});

const adminSchema = mongoose.Schema({
 email:String,
 password:String
});

module.exports = mongoose.model("admin", adminSchema);
