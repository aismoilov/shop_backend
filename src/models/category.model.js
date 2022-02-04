const { Schema, model, Types } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    parent: {
        type: Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    slug: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

module.exports = model('Category', categorySchema);