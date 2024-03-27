const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment: {type: String},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" }
})

module.exports = mongoose.model('comments', commentSchema)