const { Schema, model, Types } = require('mongoose');

const productSchema = Schema({
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true,
    },
},{
    timestamps: true,
});

module.exports = model('Product', productSchema);