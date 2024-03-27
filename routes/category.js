const express = require('express');
const Category = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', (req, res) => {
    const catModel = new Category({
        _id: new mongoose.Types.ObjectId(),
        categoryTitle: req.body.categoryTitle,
        categoryDescription: req.body.categoryDescription
    })

    catModel.save().then(response => {
        res.json({
            success: 1,
            message: "Category created successfully!",
            data: response
        })
    }).catch(error => console.log(error))

})

router.get('/', (req, res) => {
    Category.find({}).then(response => {
        res.status(200).json({
            success: 1,
            data: response
        })
    }).catch(error => console.log(error))
})

module.exports = router;