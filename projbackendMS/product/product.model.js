const mongoose = require('mongoose')

const productCartSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxLength: 40
    },

    description: {
        type: String,
        required: [true, 'Please provide a description']
    },

    price: {
        type: Number,
        required: [true, 'Please provide a price for it'],
        maxLength: 5
    },

    photos: [
        {
            id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: {
            values: [
                'shortsleeves',
                'longsleeves',
                'sweatshirt',
                'hoodie'
            ],
            message: 'Please provide a category from these selective values'
        }
    },

    brand: {
        type: String,
        required: [true, 'Please provide a brand name for your product']
    },

    stock: {
        type: Number,
        required: [true, 'Please provide a number of stocks you have added']
    },

    rating: {
        type: Number,
        default: 0
    },

    numberOfReviews: {
        type: Number,
        default: 0
    },
    
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            
            name: {
                type: String,
                required: true
            },

            rating: {
                type: Number,
                required: true
            },

            comment: {
                type: String,
                required: true
            }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productCartSchema)