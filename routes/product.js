const express = require('express');
const Product = require('../models/product');
const productController = require('../controllers/product');

const router = express.Router();

router.post('/add-product', productController.postAddProduct);
router.get('/all-products', productController.getAllProduct);
router.delete('/delete-product/:id',productController.deleteProduct);
router.put('/edit-product/:id',productController.editProduct);
router.patch('/update-quantity/:id', productController.updateProductQuantity);

module.exports = router;
