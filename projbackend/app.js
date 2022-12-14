require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

// middleware
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// custom routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// connect return a promise that needs to be handled with then && catch
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log('Connected to DB SUCCESSFULLY');
})
.catch(() => {
    console.log('Problem with DB connection');
});

// STARTING APP
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});