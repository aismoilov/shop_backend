const express = require('express');
const userRouter = require('./src/routes/user.route');
const productRouter = require('./src/routes/product.route');
const cartRouter = require('./src/routes/cart.router');
require('./config/db.config');

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})