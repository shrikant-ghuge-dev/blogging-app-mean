const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryTitle: { type: String },
    categoryDescription: { type: String }
});

module.exports = mongoose.model('Category', categorySchema)