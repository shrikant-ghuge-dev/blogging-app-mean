const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: {
        type: String, required: [true, 'Please enter an email.'], unique: true,
        lowercase: true
    },
    password: { type: String, required: [true, 'Please enter a password.'], },
    name: { type: String, required: [true, 'Please enter your name.'] },
    about: { type: String, require: true },
    image: { type: String},
    role: { type: String, enum: ['User', 'Admin'], default: 'User', require: true },
    active: {
        type: Boolean,
        default: true
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
})

module.exports = mongoose.model('users', userSchema)