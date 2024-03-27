const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');

router.post('/user/:userId/category/:categoryId/posts', (req, res, next) => {
    const postData = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.body.image,
        userId: req.params.userId,
        categoryId: req.params.categoryId
    })
    postData.save().then(response => {
        return res.status(201).json({
            success: 1,
            message: "Post created successfully!",
            data: response
        });
    }).catch(err => console.log(err))
})


router.post('/:postId/comments', (req, res, next) => {
    const commentData = new Comment({
        comment: req.body.comment,
        postId: req.params.postId
    })

    commentData.save().then(response => {
        return res.status(201).json({
            success: 1,
            message: "Comment added successfully!",
            data: response
        });
    }).catch(err => console.log(err))
})

// Get All posts
router.get('/', (req, res) => {
    Post.find().then(response => {
        return res.status(201).json({
            success: 1,
            data: response
        });
    }).catch(err => console.log(err))
})

// Get post by postid
router.get('/:postId', (req, res) => {
    Post.find({ _id: req.params.postId }).then(response => {
        return res.status(201).json({
            success: 1,
            data: response
        });
    }).catch(err => console.log(err))
})

// Delete post
router.delete('/:postId', (req, res) => {
    Post.deleteOne({ _id: req.params.postId }).then(response => {
        return res.status(201).json({
            success: 1,
            message: 'Post deleted successfully',
            data: response
        });
    }).catch(err => console.log(err))
})

// Update post
router.put('/:postId', (req, res, next) => {
    const postData ={
        _id: req.params.postId,
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: '',
    }

    Post.findByIdAndUpdate(req.params.postId, postData, { new: true }).then(response => {

        return res.status(201).json({
            success: 1,
            message: "Post updated successfully!",
            data: response
        });
    }).catch(err => console.log(err))
})


module.exports = router;