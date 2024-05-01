const express = require('express')
const User = require('../models/user')
const router = express.Router()
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

router.get('/:userId', (req, res) => {
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


router.get('/', (req, res) => {
    User.find({}).select('-password').then(users => {
        res.status(200).json({
            success: 1,
            data: users
        })
    }).catch(error => {
        res.status(500).json({
            success: 0,
            message: 'Internal server error'
        });
    })
})

router.put('/:userId', (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        about: req.body.about
    }

    User.findByIdAndUpdate(req.params.userId, userData, { new: false }).select('-password').then(response => {
        if (response === null || response.length === 0) {
            return res.status(404).json({
                success: 0,
                message: 'User not found'
            });
        }
        return res.status(201).json({
            success: 1,
            message: "User updated successfully!",
            data: response
        });
    }).catch(err => {
        res.status(500).json({
            success: 0,
            message: 'Internal server error'
        });
    })
})

router.patch('/:userId', upload.single('image'), (req, res) => {
    const imagePath = req?.file?.path;

    const userData = {
        name: req.body.name,
        about: req.body.about,
        image: imagePath,
    }

    User.findByIdAndUpdate(req.params.userId, userData, { new: false }).select('-password').then(response => {
        if (response === null || response.length === 0) {
            return res.status(404).json({
                success: 0,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: 1,
            message: "User updated successfully!",
            data: response
        });
    }).catch(err => {
        res.status(500).json({
            success: 0,
            message: 'Internal server error'
        });
    })
})

router.delete('/:userId', (req, res) => {
    User.deleteOne({ _id: req.params.userId }).then(response => {
        if (response.deletedCount === 0) {
            return res.status(404).json({
                success: 0,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: 1,
            message: "User deleted successfully!",
            data: response
        })
    }).catch(error => {
        res.status(500).json({
            success: 0,
            message: 'Internal server error'
        });
    })
})

module.exports = router