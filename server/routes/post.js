const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');
// Image upload
var multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
        const currentTime = currentDate.toTimeString().slice(0, 8).replace(/:/g, ''); // Format: HHMMSS
        // Generate the new filename with date and time
        const newFilename = `${formattedDate}_${currentTime}${file.originalname}`;
        cb(null, newFilename);
    }
})
var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
})

router.post('/user/:userId/category/:categoryId/posts', upload.single('image'), (req, res, next) => {
    // Get the uploaded file information
    const imagePath = req?.file?.path;

    const postData = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        // category: req.body.category,
        image: imagePath,
        userId: req.params.userId,
        categoryId: req.params.categoryId
    })
    postData.save().then(response => {
        return res.status(201).json({
            success: 1,
            message: "Post created successfully!",
            data: response
        });
    }).catch(err => {
        return res.status(400).json({
            success: 0,
            message: "Missing required fields",
            data: err
        });
    })
},
    // multer Error Handling
    (error, req, res, next) => {
        console.log("str1", error);
        next(res.status(400).send({
            message: error.message
        }))
    }
)


router.post('/:postId/comments', (req, res, next) => {
    if (!req.body.comment) {
        return res.status(403).json({
            success: 0,
            message: "Comment or userId can't be empty!"
        });
    }
    const commentData = new Comment({
        comment: req.body.comment,
        postId: req.params.postId,
        // userId: req.body.userId
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
// router.get('/', (req, res) => {
//     Post.find().populate("userId", "-password").populate("categoryId").select('-password').then(response => {
//         return res.status(201).json({
//             success: 1,
//             data: response
//         });
//     }).catch(err => console.log(err))
// })
router.get('/', async (req, res) => {
    const { searchTerm, catId } = req.query;
    let query = {};

    if (searchTerm) {
        // Add conditions to search by title or content
        query = {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for title
                // { content: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search for content
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


// Get post by postid
router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .populate("userId", "-password")
        .populate("categoryId")
        .select('-password')
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    success: 0,
                    message: "Post not found."
                });
            }

            Comment.find({ postId: req.params.postId })
                .then(comments => {
                    return res.status(200).json({
                        success: 1,
                        data: {
                            post: post,
                            comments: comments
                        }
                    });
                })
                .catch(commentErr => {
                    console.log(commentErr);
                    return res.status(500).json({
                        success: 0,
                        message: "An error occurred while fetching comments."
                    });
                });
        })
        .catch(postErr => {
            console.log(postErr);
            return res.status(500).json({
                success: 0,
                message: "An error occurred while fetching post."
            });
        });
});

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
    const postData = {
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