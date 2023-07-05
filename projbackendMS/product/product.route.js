const express = require('express');
const router = express.Router();
const {addProduct, getSingleProduct, getAllProducts} = require('./product.controller');
const {isLoggedIn, customRole} = require('./utils/middleware');

// for testing
router.route('/testproduct').get((req, res) => {
    res.send('From test product route');
});

// admin routes
// isLoggedIn -> customRole -> endPointController
router.route('/admin/product/add').post(isLoggedIn, customRole('admin'), addProduct);
router.route('/admin/products').get(isLoggedIn, customRole('admin'), getAllProducts);
router.route('/admin/product/update/:id').put((req, res) => res.send('Admin updating a product'));

// user routes
router.route('/products').get(getAllProducts);
// TODO: test
router.route('/product/:id').get(getSingleProduct);
router.route('/review').put((req, res) => console.log('updating a review'));
router.route('/review').delete((req, res) => console.log('deleting the review'));
router.route('/reviews').get((req, res) => res.send('get all the reviews pertaining in the product'))

module.exports = router;