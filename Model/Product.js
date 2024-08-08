const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "User is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const crudSchema = new mongoose.Schema(
  {
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
    tags: {
      type: [String],
      required: [true, "Tags are required"],
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
      required: [true, "Real Price is required"],
    },
    costType: {
      type: String,
      required: [true, "Cost Type is required"],
    },
    startingPrice: {
      type: Number,
    },
    website: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: [true, "Website URL is required"],
    },
    benefits: {
      type: [String],
      required: [true, "Benefits are required"],
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", crudSchema, "Product");
