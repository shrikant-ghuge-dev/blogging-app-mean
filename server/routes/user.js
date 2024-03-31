const express = require('express')
const User = require('../models/user')
const router = express.Router()

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
        console.log(error)
    })
})


router.get('/', (req, res) => {
    User.find({}).select('-password').then(users => {
        res.status(200).json({
            success: 1,
            data: users
        })
    }).catch(error => console.log(error))
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
    }).catch(err => console.log(err))
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
    }).catch(error => console.log(error))
})

module.exports = router