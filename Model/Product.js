const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  vendor: {
    type: String,
    required: [true, "Vendor is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
  },
  picture: {
    type: String,
    required: [true, "Picture is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  marketCost: {
    type: Number,
  },
  discount: {
    type: String,
  },
  realPrice: {
    type: Number,
    required: [true, "realPrice is required"],
  },
  costType: {
    type: String,
    required: [true, "Cost Type is required"],
  },
  startingPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", crudSchema, "Product");
