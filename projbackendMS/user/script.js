require('dotenv').config();
// connecting to mongodb
const mongoose = require('mongoose');
const User = require('./user.model');
mongoose.connect(process.env.MONGODB_CONNECT_URI).then(async () => {
    console.log('Connected to MongoDB sucessfully');

    for (let i = 1; i < 100000; i++) {
        const email = 'v' + i + '@gmail.com';
        const user = await User.create({email, name: 'v' + i, password : '123456'});
        console.log(i);
    }
});

require('express')().listen(6000, () => console.log('Listening on PORT 6000....'))

