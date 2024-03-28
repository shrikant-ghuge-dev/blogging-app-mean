const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/:userId', (req, res) => {
    User.find({ _id: req.params.userId }).select('-password').then(user => {
        res.status(200).json({
            success: 1,
            data: user
        })
    }).catch(error => console.log(error))
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

        return res.status(201).json({
            success: 1,
            message: "User updated successfully!",
            data: response
        });
    }).catch(err => console.log(err))
})

module.exports = router