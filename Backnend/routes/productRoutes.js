const express = require('express');
const productController = require("../controller/productController");
const productRouter = express.Router();

productRouter.get('/product', productController.product_get);
productRouter.get('/product/:key', productController.search);
productRouter.get('/AllDataWithFilterAndPagination', productController.pagination);

module.exports = productRouter;