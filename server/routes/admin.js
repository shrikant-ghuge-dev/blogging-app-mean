const express = require('express');
const Category = require('../models/category');
const mongoose = require('mongoose');

const router = express.Router();


router.get('', (req, res) => {
    res.json({ message: "working" })
})


// Create a new category
router.post('/category', async (req, res) => {
    try {
        const { categoryTitle, categoryDescription } = req.body;

        // Create a new category instance
        const catModel = new Category({
            _id: new mongoose.Types.ObjectId(),
            categoryTitle,
            categoryDescription
        });

        // Save the category to the database
        const savedCategory = await catModel.save();

        res.status(201).json({
            success: true,
            message: 'Category created successfully!',
            data: savedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create category',
            error: error.message
        });
    }
});

// Delete a category by ID
router.delete('/category/:catId', async (req, res) => {
    try {
        const deletedCategory = await Category.deleteOne({ _id: req.params.catId });

        if (deletedCategory.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            data: deletedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete category',
            error: error.message
        });
    }
});

router.get('/users', async (req, res) => {
    try {
        // Fetch all users except the password field
        const users = await User.find({}).select('-password');

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No users found'
            });
        }

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
});

// Delete post
router.delete('/post/:postId', async (req, res) => {
    try {
        // Delete all comments associated with the post
        await Comment.deleteMany({ postId: req.params.postId });

        // Delete the post
        const deletedPost = await Post.deleteOne({ _id: req.params.postId });

        if (deletedPost.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Post and associated comments deleted successfully',
            data: deletedPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete post and associated comments',
            error: error.message
        });
    }
});


module.exports = router