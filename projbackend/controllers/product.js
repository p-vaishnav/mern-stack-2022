// https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/

const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { json } = require('body-parser');


exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category') //TODO: understand populate to a full extent 
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'unable to find product'
                });
            }

            req.product = product;
            next();
        });
}

exports.getProduct = (req, res) => {
    res.status(200).json({
        message: 'Product with Id exists'
    });
}

exports.createProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with the image'
            });
        }

        const {name, description, price, stock, category} = fields;

        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({
                error: 'Please include all the fields!'
            });
        }

        // TODO: restrictions on the field
        const product = new Product(fields);

        // handle file here
        if (file.photo) {
            if (file.photo.size > (2*1024*1024)) {
                return res.status(400).json({
                    error: 'File size too big!'
                });
            }
        }

        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    
        // save to the db
        product.save((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'saving tshirt in db failed'
                });
            }

            res.json(product);
        })
    });
    
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

// delete
exports.deleteProduct = (req, res) => {
    const product = req.product;
    product.remove((err, product) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to delete the product from DB!'
            });
        }
        return res.status(200).json({
            message: `Successfully deleted product named ${product.name}`
        });
    });
}

// updateProduct
exports.updateProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with the image'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        // handle file here
        if (file.photo) {
            if (file.photo.size > (2*1024*1024)) {
                return res.status(400).json({
                    error: 'File size too big!'
                });
            }
        }
        if (file.photo && file.photo.path) {
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        
        // save to the db
        product.save((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'saving tshirt in db failed'
                });
            }

            res.json(product);
        })
    });
}

exports.getAllProducts = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 8;
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, 'asc']]) // Product.sort([['createdAt', 'ascending']])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400)
                    .json({
                        error: 'Unable to fetch products from db!' 
                    });
            }

            res.json(products);
        })
}

exports.updateStock = (req, res) => {
    const myOperations = req.body.order.products.map((prod) => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {sold: +prod.count, stock: -prod.count}}
            }
        };
    });

    // TODO: bulkwrite read more about it and make notes
    Product.bulkWrite(myOperations, {}, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'Unable to Bulk write'
            });
        }

        next();
    });
}

// TODO: quite unique way have a look at it once
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct('category', {}, (err, category) => {
        if (err) {
            return res.status(400)
                    .json({
                        error: 'Unable to fetch unique categories'
                    });
        }

        res.json(category);
    });
}