const express = require('express');
const router = express.Router();
const CheckoutController = require('../App/Controllers/CheckoutController');
router.post('/store',CheckoutController.store);
router.get('/populate',CheckoutController.populateData);
router.get('/order-placed',CheckoutController.get);



module.exports = router;