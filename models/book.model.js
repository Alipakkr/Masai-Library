const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  price: Number,
  quantity: Number
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
