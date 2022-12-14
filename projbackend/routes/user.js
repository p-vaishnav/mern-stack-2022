const User = require('../models/user');

const express = require('express');
const router = express.Router();
const {getUserById, getUser, getAllUsers, updateUser, userPurchaseList} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

// routes
router.param('userId', getUserById);
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);
router.get('/orders/user/:userId', isSignedIn, isAuthenticated, userPurchaseList);

// TODO: home work
/*
commenting
router.get('/users', getAllUsers);
*/

module.exports = router;