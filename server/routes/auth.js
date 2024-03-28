const express = require('express')
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// password encryption
const saltRounds = 10

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: 0, message: 'User with email not found!' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json({ success: 0, message: 'Invalid password!' });
        }

        // Create and sign JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Exclude password field from user object
        const { password: userPassword, ...userData } = user.toObject();

        // Send token in response
        return res.status(200).json({ success: 1, message: 'Login successful.', user: userData, token });

    } catch (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error.' });
    }
});

router.post('/register', async (req, res, next) => {
    const user = await User.find({ email: req.body.email });
    if (user.length) {
        return res.status(409).json({
            success: 0,
            message: "Email is already registered!",
        });
    }

    let encryptedPassword;
    bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(req.body.password, salt)
        })
        .then(hash => {
            encryptedPassword = hash
            let data = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                name: req.body.name,
                password: encryptedPassword,
                about: req.body.about
            })
            data.save().then((response) => {
                return res.status(201).json({
                    success: 1,
                    message: "User register successfully!",
                    data: data
                });
            })
                .catch(err => console.error(err.message))
        }).catch((error) => {
            return res.status(500).send({ message: error.message });
        })
});

// Store tokens and associate them with email addresses
const passwordResetTokens = {};

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 2525,
    // secure: true,
    auth: {
        user: 'shreeghuge1@gmail.com', // replace with your email
        pass: 'fhzo kruq myrm qlnh' // replace with your password
    }
});

// Route for handling forgot password requests
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Find user by email (replace with your database query)
    const user = await User.find({ email });
    console.log(user)
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate and store reset token
    const token = generateToken();
    console.log('User array:', user);
    // Assuming user is an array containing user objects
    for (const currentUser of user) {
        currentUser.resetToken = token;
        currentUser.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

        // Save the current user object
        await currentUser.save();
    }

    // Send password reset email
    const mailOptions = {
        from: 'shreeghuge1@gmail.com', // replace with your email
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${process.env.BASE_URL}/reset-password?token=${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        console.log('Email sent:', info.response);
        return res.status(200).json({ success: true, message: 'Password reset email sent' });
    });
});

// Generate random token
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Route for handling password reset requests
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    // Validate token (check if it's valid and not expired)
    if (!isValidToken(token)) {
        return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    // Find user by token (replace with your database query)
    const user = await findUserByToken(token);
    console.log('------------', user, newPassword)
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }


    // Update user's password with the new one
    await updateUserPassword(user, newPassword);

    // Invalidate or expire the token
    invalidateToken(token);

    // Optionally, notify the user that their password has been reset
    await sendPasswordResetConfirmationEmail(user.email);

    return res.status(200).json({ success: true, message: 'Password reset successfully' });
});

async function sendPasswordResetConfirmationEmail(email) {
    console.log(email, "success")
    // Define email content
    const mailOptions = {
        from: 'shreeghuge1@gmail.com',
        to: email,
        subject: 'Password Reset Successful',
        text: 'Your password has been successfully reset.'
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset confirmation email sent:', info.response);
    } catch (error) {
        console.error('Error sending password reset confirmation email:', error);
        throw error; // Re-throw the error for handling in the calling code
    }
}

// Function to validate the token
async function isValidToken(token) {
    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } });
    return !!user;
}

// Function to find user by token
async function findUserByToken(token) {
    return await User.findOne({ resetToken: token });
}

// Function to update user's password
async function updateUserPassword(user, newPassword) {
    try {
        // Ensure that the user is a Mongoose model instance
        if (!(user instanceof User)) {
            throw new Error('User is not a valid Mongoose model instance');
        }

        let encryptedPassword;
        bcrypt
            .genSalt(saltRounds)
            .then(salt => {
                return bcrypt.hash(newPassword, salt)
            })
            .then(hash => {
                encryptedPassword = hash
            })

        // Update the user's password
        user.password = encryptedPassword;
        await user.save();
    } catch (error) {
        console.error('Error updating user password:', error);
        throw error; // Re-throw the error for handling in the calling code
    }
}

// Function to invalidate the token
async function invalidateToken(token) {
    await User.updateOne({ resetToken: token }, { $unset: { resetToken: 1, resetTokenExpiry: 1 } });
}


module.exports = router;