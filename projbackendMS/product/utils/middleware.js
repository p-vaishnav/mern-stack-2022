const BigPromise = require("./BigPromise");
const User = require('./BigPromise');
const jwt = require('jsonwebtoken');

exports.isLoggedIn = BigPromise((req, res, next) => {
    // for web for mobile
    const token = req.cookies.token || (req.body && req.body.token) || req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return next(new CustomError('Token does not exist, please provide a valid one'));
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data;

    next();
});

exports.customRole = function(...roles) {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next()
            return;
        }
        next(new Error('You are not authorized to access this endpoint'))
    }
}