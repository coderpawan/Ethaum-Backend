const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  star: {
    type: Number,
    required: [true, "Rating is required"],
  },
  price: {
    type: Number,
    required: [true, "Price can't be blank"],
  },
  details: {
    type: String,
    required: [true, "description can't be blank"],
  },
});

module.exports = mongoose.model("Product", crudSchema, "Product");
