const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SearchbarSchema = new Schema({
  author: { type: String, required: true },
  country: { type: String, required: true },
  imageLink: { type: String, required: true },
  language: { type: String, required: true },
  link: { type: String, required: true },
  pages: { type: Number, required: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
});

const Searchbar = mongoose.model("Searchbar", SearchbarSchema);

module.exports = Searchbar;
