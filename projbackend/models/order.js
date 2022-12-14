const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productCartSchema = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    name: String,
    count: Number,
    price: Number
});

const orderSchema = new Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    updated: {
        type: Date
    },
    status: {
        type: String,
        default: 'Recieved',
        enum: ['Recieved', 'Delivered', 'Processing', 'Shipped', 'Cancelled']
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
const ProductCart = mongoose.model('ProductCart', productCartSchema);

module.exports = {Order, ProductCart};