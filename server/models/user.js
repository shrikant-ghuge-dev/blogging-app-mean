const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    about: { type: String, require: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
})

module.exports = mongoose.model('users', userSchema)