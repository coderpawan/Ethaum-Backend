const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming 'image' will be a URL or path to the image
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
