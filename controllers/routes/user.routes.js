const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/user.model');
const orderRoutes=require("./order.routes.js")
const bookRoutes=require("./book.routes.js")



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
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    try {
        if (user) {
            bcrypt.compare(password, user.password, (err, decoded) => {
                if (decoded) {
                    const access_token = jwt.sign({ name: "Alipa", isAdmin:user.isAdmin }, "masai")
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


module.exports = {router,bookRoutes,orderRoutes};
