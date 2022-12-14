const express = require('express');
const app = express();

const PORT = 8080;

const isAdmin = (req, res, next) => {
    console.log('IN IS ADMIN MIDDLEWARE');
    next();
}

const admin = (req, res) => {
    return res.send('ADMIN HOME PAGE');
}

app.get('/admin', isAdmin, admin);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});