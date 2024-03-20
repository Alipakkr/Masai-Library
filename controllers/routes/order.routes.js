const express = require('express');
// const router = express.Router();
const { authMiddleware,adminMiddleware } = require('../middlewares/admin.Middleware');
const Order = require('../../models/order.model');
const orderRoutes=express.Router()

orderRoutes.post('/order', authMiddleware, async (req, res) => {
  try {
    // Place order logic
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

orderRoutes.get('/orders', adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('books');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
orderRoutes.post('/order', authMiddleware, async (req, res) => {
    try {
      // Assuming req.body contains the necessary information for placing an order
      const { userId, books, totalAmount } = req.body;
      const newOrder = new Order({ user: userId, books, totalAmount });
      await newOrder.save();
      res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  orderRoutes.get('/orders', adminMiddleware, async (req, res) => {
    try {
      const orders = await Order.find().populate('user').populate('books');
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = orderRoutes ;
