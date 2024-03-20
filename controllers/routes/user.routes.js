const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user');

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email,password} = req.body
    const ExistUser = await User.findOne({ email })
    if (ExistUser) {
        return res.status(201).json({ msg: "User already exist, please login" })
    }
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(401).json({ error: err })
            }
            const user = new User({ name, email, password:hash, isAdmin: false });
            await user.save()
            res.status(201).json({ msg: "New user has been registered", new_user: user })
        })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

// Login user and return JWT token
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    try {
        if (user) {
            bcrypt.compare(password, user.password, (err, decoded) => {
                if (decoded) {
                    const access_token = jwt.sign({ name: "Alipa" }, "masai")
                    res.status(201).json({ msg: "Login Successfull", access_token })
                } else {
                    res.status(201).json({ msg: "Wrong password,Try Again!!" })
                }
            })
        } else {
            res.status(201).json({ msg: "No user found, Please register" })
        }
    } catch (err) {
        res.status(400).json({ error: err })
    }
});

// Get all available books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get details of a specific book by ID
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error('Book not found');
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get books by category
router.get('/books', async (req, res) => {
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
router.get('/books', async (req, res) => {
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
module.exports = router;
