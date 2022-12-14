const User = require('../models/user');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// TODO: if I don't have a cookie-parser middleware, how cookie will look in a req

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'Unable to save user in DB'
            });
        }
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    });    
};

exports.signin = (req, res) => {
    // capturing errors via express-validator
    const errors = validationResult(req);
    const {email, password} = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()[0].msg
        });
    }

    User.findOne({email}, (err, user) => {
        if (err || !user) {
            // send 400 status - Bad request
            return res.status(400).json({
                error: "Unable to find user in DB"
            });
        }

        if (!user.authenticate(password)) {
            // send 401 status - Unauthorized
            return res.status(401).json({
                error: "Email and password does not match"
            });
        }

        const {_id, name, email, role} = user;
        // generating token
        const token = jwt.sign({_id}, process.env.SECRET);

        // setting cookie
        res.cookie('token', token);

        // response to the front end - 200 OK
        return res.status(200).json({
            _id,
            name,
            email,
            role,
            token
        });

    });
};

exports.signout =  (req, res) => {
    res.clearCookie('token');
    return res.json({
        message: 'User signout successfully'
    });
};

// protected routes

// little bit confused
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

// custom made middlewares as well
// isAuthenticated
exports.isAuthenticated = (req, res, next) => {
    // req.profile will be set from frontend
    const checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
        return res.status(403).json({
            error: 'ACCESS DENIED'
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Not Admin user, ACESS DENIED'
        })
    }
    next();
}