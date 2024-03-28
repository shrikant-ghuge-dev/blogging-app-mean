const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();

// router.post('post/:postId/comments', (req, res, next) => {
//     const commentData = new Comment({
//         comment: req.body.comment,
//         postId: req.params.postId
//     })

//     commentData.save().then(response => {
//         return res.status(201).json({
//             success: 1,
//             message: "Comment added successfully!",
//             data: response
//         });
//     }).then(err => console.log(err))
// })

router.get('/:postId/comments', (req, res, next) => {
    Comment.find({ postId: req.params.postId }).then(response => {
        return res.status(201).json({
            success: 1,
            data: response
        });
    }).then(err => console.log(err))
})

module.exports = router