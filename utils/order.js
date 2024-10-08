require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("connected Order data");
});

const orderSchema = mongoose.Schema({
 productNames:[],
 quantity:Number,
 totalPrice:Number,
 fullName:String,
 address:String,
 phone:Number,
 area:String,
 orderStatus:{
    type:String,
    default:'Pandding'
 },

});

module.exports = mongoose.model("order", orderSchema);
