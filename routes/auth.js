const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@blogging.gxq08ji.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.database}`).then(res => console.log("connected"))

router.post('/login', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({ message: "OK" });
});

module.exports = router;