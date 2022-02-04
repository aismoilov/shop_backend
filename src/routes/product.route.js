const express = require('express');
const Product = require('../models/product.model');
const Auth = require('../../middleware/auth');
const router = new express.Router();

// Add product
router.post('/products', Auth, async (req, res) => {
    try {
        const newProduct = new Product({
            ...req.body,
            owner: req.user._id
        });
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send({message: "Не удалось добавить товар", error})
    }
});

// Update product
router.patch('/products/:id', Auth, async (req, res) => {
    const updateProperties = Object.keys(req.body);
    const allowedUpdateProperties = ['name', 'description', 'category', 'price'];

    const isValidOperation = updateProperties.every((property) =>
        allowedUpdateProperties.includes(property)
    );

    if (!isValidOperation) {
        return res.status(400).send({error: 'Указаны неверные поля'});
    }

    try {
        const productItem = await Product.findOne({_id: req.params.id});
        if (!productItem) {
            return res.status(404).send({error: 'Товар не найден'});
        }
        updateProperties.forEach((property) => productItem[property] = req.body[property]);
        await productItem.save();
        res.send(productItem);
    } catch(error) {
        res.status(400).send(error);
    }
});

// Delete product
router.delete('/products/:id', Auth, async (req, res) => {
    try {
        const productItem = await Product.findOneAndDelete({_id: req.params.id});
        if (!productItem) {
            res.status(404).send({error: 'Товар не найден'});
        }
        res.send(productItem);
    } catch(error) {
        res.status(400).send(error);
    }
})

// Get product by Id
router.get('/products/:id', async (req, res) => {
    try {
        const productItem = await Product.findOne({_id: req.params.id});
        if (!productItem) {
            res.status(404).send({error: 'Товар не найден'});
        }
        res.status(200).send(productItem);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;