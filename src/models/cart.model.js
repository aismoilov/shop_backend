const { Schema, model, Types } = require('mongoose');

const cartSchema = Schema({
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: [{
        productId: {
            type: Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        price: Number,
    }],
}, {
    timestamps: true,
});

module.exports = model('Cart', cartSchema);