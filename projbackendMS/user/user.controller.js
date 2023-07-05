
const User = require('./user.model');
const cookieToken = require('./utils/createCookie');
const cloudinary = require('cloudinary').v2;

const BigPromise = fun => (req, res, next) => Promise.resolve(fun(req, res, next)).catch((err) => {
    switch (err.code) {
        case 11000:
            res.status(500).send('Email exists in the Data base');
            break;
    }
});

exports.signUp = BigPromise(async (req, res, next) => {
    let result;

    // TODO: use case is breaking when I am giving existing email, but image do gets uploaded

    if (req.files) {
        const file = req.files.photo;
        result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'users',
            width: 150,
            crop: 'scale'
        });
    }
    const {email, password, name} = req.body;

    if (!email || !password || !name) {
        return res.status(406).json({msg: "Please provide all the necessary fields"})
    }

    const user = await User.create({
        name,
        email,
        password,
        photo: {
            id: result.public_id,
            secure_url: result.secure_url
        }
    });
    cookieToken(user, res);
});

exports.signIn = BigPromise(async (req, res, next) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(406).json({msg: 'Please provide all the necessary fields'});
    }

    const user = await User.findOne({email: email}).select('+password');

    if (!user) {
        res.status(400).json({
            msg: 'User not present in DB'
        });
    }

    const passwordMatched = await user.isValidatedPassword(password);
    if (!passwordMatched) {
        return res.status(401).json({
            msg: 'Invalid password'
        });
    }
    cookieToken(user, res);
});

exports.signOut = BigPromise(async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        msg: 'Singout successful'
    })
})