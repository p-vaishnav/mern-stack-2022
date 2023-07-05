require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// cloudinary initialization
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const app = express();
const router = require('./product.route');

// for uploading images only, will be removed in future
app.set("view engine", "ejs");
app.get('/mypostform', (req, res) => {
    res.render("postform");
});

// for json body and url-encoded
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// for cookie and file middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// routes
app.use('/api/v1', router);

// connecting to mongoDB
mongoose.connect(process.env.MONGODB_CONNECT_URI).then(() => {
    console.log('Connected to MongoDB successfully')
});

const PORT = process.env.PORT || 6005
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))

// TODO: 
// product upload route should be finished - DONE
// AdminAddProduct -> DONE
// AdminGetAllProduct -> DONE
// GetSingleProduct -> DONE
// AddReview
// DeleteReview
// GetReviewForAProduct
// AdminGetAllProducts
// AdminUpdateProduct
// AdminDeleteProduct
