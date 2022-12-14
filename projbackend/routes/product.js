const express = require('express');
const router = express.Router();

// middlewares
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');
const {getProductById, getProduct, createProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require('../controllers/product');

// params
router.param('userId', getUserById);
router.param('productId', getProductById);

// routes
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);

// get routes
router.get('/product/:productId', getProduct);

// middleware routes
router.get('/product/photo/:productId', photo);

// update routes
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct);

// delete routes
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct);

// listing routes
router.get('/products', getAllProducts);

// unique way to get all categories
router.get('/products/categories', getAllUniqueCategories);

module.exports = router;