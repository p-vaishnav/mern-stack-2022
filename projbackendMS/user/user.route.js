const express = require('express');
const router = express.Router();
const {signUp, signIn, signOut} = require('./user.controller');

router.route('/usertest').get((req, res) => {
    res.json({msg: 'Success'})
});

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/signout').get(signOut);


module.exports = router;