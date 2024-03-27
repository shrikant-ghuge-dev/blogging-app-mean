const express = require('express')
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

// password encryption
const saltRounds = 10

router.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: 0, message: 'User with email not found!' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json({ success: 0, message: 'Invalid password!' });
        }

        // Create and sign JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Exclude password field from user object
        const { password: userPassword, ...userData } = user.toObject();

        // Send token in response
        return res.status(200).json({ success: 1, message: 'Login successful.', user: userData, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: 0, message: 'Internal server error.' });
    }
});

router.post('/register', async (req, res, next) => {
    const user = await User.find({ email: req.body.email });
    if (user.length) {
        return res.status(409).json({
            success: 0,
            message: "Email is already registered!",
        });
    }

    let encryptedPassword;
    bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(req.body.password, salt)
        })
        .then(hash => {
            encryptedPassword = hash
            let data = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                user_name: req.body.name,
                password: encryptedPassword,
                about: req.body.about
            })
            data.save().then((response) => {
                return res.status(201).json({
                    success: 1,
                    message: "User register successfully!",
                    data: data
                });
            })
                .catch(err => console.error(err.message))
        }).catch((error) => {
            console.log("str", error)
            return res.status(500).send({ message: error.message });
        })
});

module.exports = router;