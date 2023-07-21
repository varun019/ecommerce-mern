const express = require("express");
const cartController = require("../controller/cartController");
const cartrouter = express.Router();

cartrouter.post('/cart', cartController.addToCart);
cartrouter.get('/cartitems', cartController.getCartItems);
cartrouter.delete('/cart/:productId', cartController.removeCartItem);
cartrouter.put('/cartitems/:productId',cartController.updateCartItem);

module.exports = cartrouter;