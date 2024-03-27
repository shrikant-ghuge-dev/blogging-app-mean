const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const allowGetWithoutAuth = (req, res, next) => {
    if (req.method === 'GET') {
        // If it's a GET request, allow it to proceed without authentication
        return next();
    }
    // For other methods, proceed with authentication
    protect(req, res, next);
};

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            res.status(401)
            throw new Error('Not authorizad')

        }
    }

    if (req.originalUrl == "/api/v1/auth/register" || req.originalUrl == "/api/v1/auth/login") {
        next()
    } else if (!token) {
        res.status(401)
        throw new Error('Not authorizad, no token')
    }
})

module.exports = { allowGetWithoutAuth }