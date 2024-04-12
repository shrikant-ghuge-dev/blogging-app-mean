const express = require('express');
const Category = require('../models/category');
const mongoose = require('mongoose');

const router = express.Router();


router.get('', (req, res) => {
    res.json({ message: "working" })
})


router.post('/category', (req, res) => {
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

router.delete('/category/:catId', (req, res) => {
    Category.deleteOne({ _id: req.params.catId }).then(response => {
        return res.status(201).json({
            success: 1,
            message: 'Category deleted successfully',
            data: response
        });
    }).catch(err => console.log(err))
})

module.exports = router