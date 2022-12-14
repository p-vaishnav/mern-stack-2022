const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {signout, signup, signin, isSignedIn} = require('../controllers/auth');

// validations are not working as expected

// signup
router.post('/signup', 
[
    check('name').isLength({min: 3}).withMessage( 'Name should have a minimum length of 3'),
    check('email').isEmail().withMessage('Please provide email in proper format'),
    // check('lastname').isLength({min: 3}).withMessage('Last Name is should have a minimum length of 5')
    check('password').isLength({min: 5}).withMessage('Password should have a minimum length 5')
]
,signup);

// signin
router.post('/signin',
[
    check('email').isEmail().withMessage('Please provide email in proper format'),
    check('password').isLength({min: 5}).withMessage('Password should have a minimum length of 5')
], signin)

// signout
router.get('/signout', signout);

// testRoute
router.get('/testroute', isSignedIn, (req, res) => {
    res.json({
        auth: req.auth
    });
});

module.exports = router;