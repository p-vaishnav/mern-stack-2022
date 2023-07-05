require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();
const router = require('./user.route');

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// cloudinary initialization - Might Move into a new file
const cloudinary = require('cloudinary');

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// connecting to mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECT_URI).then(() => {
    console.log('Connected to MongoDB sucessfully');
});

// applying middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// for cookie and file middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// cors 
app.use(cors({
    origin: '*'
}));

app.use('/api/v1', router);

// uploading users, by the ejs should be removed after some time
app.set('view engine', 'ejs');
app.get('/mypostform', (req, res) => {
     res.render('postForm');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));

// TODO:
// user model and its microservcie should be up and running
// signup -> works
// signin -> works
// signout/logout -> works

// TODO: future improvements
// if entries reach a million we can use sharding by taking location of the user

