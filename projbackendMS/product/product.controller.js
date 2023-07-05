// Notes: I can't bring the user model in this repo, for sure I will have to hit it's endpoint
const BigPromise = require('./utils/BigPromise');
const Product = require('./product.model');
const cloudinary = require('cloudinary').v2;

// create a product
exports.addProduct = BigPromise(async (req, res, next) => {

    // creating an imagesArray
    const imagesArray = [];

    // TODO: will complete photo upload part after some time
    if (!req.files || !req.files.photos) {
        return next(new Error('Please provide the photos for the product'));
    }

    for (let i = 0; i < req.files.photos.length; i++) {
        let result = await cloudinary.uploader.upload(req.files.photos[i].tempFilePath, {
            folder: 'products'
        });

        imagesArray.push({
            id: result.public_id,
            secure_url: result.secure_url
        });
    }

    req.body.photos = imagesArray;

    // Applying a hack, should be much more cleaner
    // req.body.user = req.user.id;
    req.body.user = '6422b03b6beab0d28f0048a9';

    const product = await Product.create(req.body);
    res.status(200).json(product);
});

// getSingleProduct
exports.getSingleProduct = BigPromise(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new CustomError('Invalid product id'));
    }

    res.status(200).json({
        success: true,
        product
    });
});

// getAllProducts
exports.getAllProducts = BigPromise(async (req, res, next) => {
    // const resultsPerPage = 6;
    // const totalProductCount = await Product.countDocuments();

    // // req.query is amazing
    // let products = new WhereClause(Product.find(), req.query).search().filter();
    // const filteredNumberOfProducts = products.base.length;

    // products.pager(resultsPerPage);
    // products = await products.base;

    // res.status(200).json({
    //     success: true,
    //     products,
    //     filteredNumberOfProducts,
    //     totalProductCount
    // });

    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
});