const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },

    stock: {
        type: Number,
        default: 0,
        required: true
    },

    sold: {
        type: Number,
        default: 0
    },

    photo: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Product', productSchema);