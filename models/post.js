const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    image: { type: String, require: true },
    category: { type: String, require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});

module.exports = mongoose.model('posts', postSchema)