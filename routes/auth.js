const express = require('express')
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

// password encryption
const saltRounds = 10

router.post('/login', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({ message: "OK!" });
});

router.post('/register', async (req, res, next) => {
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