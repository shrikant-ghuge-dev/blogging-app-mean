const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const allowGetWithoutAuth = (req, res, next) => {
    if (req.originalUrl.includes('admin')) {
        // If it's a GET request, allow it to proceed without authentication
        // return next();
        // console.log('admin')
    }
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
            req.user = await User.findById(decoded.userId).select('-password')
            if (!req.user) {
                throw new Error('User not found');
            }
            next()

        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' });

        }
    }

    if (req.originalUrl == "/api/v1/auth/register" || req.originalUrl == "/api/v1/auth/login" || req.originalUrl == "/api/v1/auth/forgot-password" || req.originalUrl == "/api/v1/auth/reset-password") {
        next()
    } else if (!token) {
        res.status(401)
        throw new Error('Not authorizad, no token')
    }
})

const verifyAuthorization = (role) => {
    return (req, res, next) => {
        console.log("first", req.user)
        // Check if the user is authenticated and has a role
        if (req.user && req.user.role) {
            console.log("first", req.role)
            // Compare the user's role with the required role
            if (req.user.role === role) {
                // User is authorized, proceed to the next middleware
                next();
            } else {
                // User is not authorized, send a 403 Forbidden response
                res.status(403).json({ message: 'Forbidden' });
            }
        } else {
            // User is not authenticated or does not have a role, send a 401 Unauthorized response
            res.status(401).json({ message: 'Unauthorized' });
        }
    };
};

module.exports = { allowGetWithoutAuth, verifyAuthorization }