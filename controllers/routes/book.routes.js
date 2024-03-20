const express = require('express');
// const router = express.Router();
const { adminMiddleware,authMiddleware} = require('../middlewares/admin.Middleware');

const Book = require('../../models/book.model');
const bookRoutes=express.Router();

bookRoutes.get('/', async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  bookRoutes.get('/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) throw new Error('Book not found');
      res.status(200).json(book);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });


  
  // Get books by category
  bookRoutes.get('/', async (req, res) => {
    try {
      const category = req.query.category;
      let query = {};
      if (category) query.category = category;
      const books = await Book.find(query);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get books by author and category
  bookRoutes.get('/', async (req, res) => {
    try {
      const author = req.query.author;
      const category = req.query.category;
      let query = {};
      if (author) query.author = author;
      if (category) query.category = category;
      const books = await Book.find(query);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  bookRoutes.post('/',authMiddleware,adminMiddleware, async (req, res) => {
    try {
      const { title, author, category, price, quantity } = req.body;
      const newBook = new Book({ title, author, category, price, quantity });
      await newBook.save();
      res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  bookRoutes.patch('/:id' ,authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const { title, author, category, price, quantity } = req.body;
      await Book.findByIdAndUpdate(req.params.id, { title, author, category, price, quantity });
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
 
  bookRoutes.delete('/:id',authMiddleware, adminMiddleware, async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.status(202).json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  module.exports = bookRoutes ;