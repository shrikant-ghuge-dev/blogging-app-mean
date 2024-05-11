const express = require('express');
const Category = require('../models/category');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const router = express.Router();

router.get('/category', (req, res) => {
    Category.find({}).then(response => {
        res.status(200).json({
            success: 1,
            data: response
        })
    }).catch(error => console.log(error))
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
        const users = await User.find({}).select('-password');

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No users found'
            });
        }

        res.status(200).json({
            success: 1,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: 0,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
});

router.delete('/user/:userId', async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.userId });
        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
})

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

router.get('/post', async (req, res) => {
    const { searchTerm, catId } = req.query;
    let query = {};

    if (searchTerm) {
        query = {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
            ]
        };
    }

    if (catId) {
        query.categoryId = catId;
    }

    try {
        const posts = await Post.find(query)
            .populate("userId", "-password")
            .populate("categoryId")
            .select('-password');

        return res.status(200).json({
            success: 1,
            data: posts
        });
    } catch (error) {
        return res.status(500).json({
            success: 0,
            message: "Internal server error"
        });
    }
});

router.put('/user/:userId/status', async (req, res) => {
    const userId = req.params.userId;
    const { active } = req.body;

    try {
        // Find the user by ID and update their status
        const user = await User.findByIdAndUpdate(userId, { active }, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const action = active ? 'activated' : 'deactivated';
        return res.status(200).json({ success: true, message: `User ${action} successfully`, data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/user/:userId', (req, res) => {
    User.find({ _id: req.params.userId }).select('-password').then(user => {
        if (user.length === 0) {
            return res.status(404).json({
                success: 0,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: 1,
            data: user
        })
    }).catch(error => {
        res.status(500).json({
            success: 0,
            message: 'Internal server error'
        });
    })
})

// Comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find({});
        if (comments.length === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Comments not found'
            });
        }
        res.status(200).json({
            success: 1,
            data: comments
        });
    } catch (error) {
        res.status(500).json({
            success: 0,
            message: 'Internal server error'
        });
    }
});



module.exports = router