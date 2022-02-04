const express = require('express');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Auth = require('../../middleware/auth');
const router = new express.Router();

// Get cart
router.get('/cart', Auth, async (req, res) => {
    const owner = req.user._id;

    try {
        const cart = await Cart.findOne({ owner });
        if (cart && cart.items.length > 0) {
            res.status(200).send(cart);
        } else {
            res.send(null);
        }
    } catch (error) {
        res.status(500).send();
    }
});

// Create cart
router.post('/cart', Auth, async (req, res) => {
    const owner = req.user._id;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ owner });
        const productItem = Product.findOne({_id: productId});
        if (!productId) {
            return res.status(404).send({message: 'Товар не найден'});
        }

        const price = productItem.price;
        const name = productItem.name;
        if (cart) {
            const itemIndex = cart.products.findIndex((item) => item.productId === productId);
            if (itemIndex > -1) {
                let product = cart.products[itemIndex];
                product.quantity += quantity;
                cart.products[itemIndex] = product;

                await cart.save();
                res.status(200).send(cart);
            } else {
                cart.products.push({ productId, name, price, quantity });

                await cart.save();
                res.status(200).send(cart);
            }
        } else {
            const newCart = await Cart.create({
                owner,
                products: [{ productId, name, price, quantity }],
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        res.status(500).send('Что-то пошло не так');
    }
});

// Delete product from cart
router.delete('/cart', Auth, async (req, res) => {
    const owner = req.user._id;
    const productId = req.query.productId;

    try {
        let cart = await Cart.findOne({ owner });
        const itemIndex = cart.products.findIndex((item) => item.productId == productId);
        if (itemIndex > -1) {
            let item = cart.products[itemIndex];
            cart.products.splice(itemIndex, 1);
            cart = await cart.save();
            res.status(200).send(cart);
        } else {
            res.status(404).send('Товар не найден');
        }
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;