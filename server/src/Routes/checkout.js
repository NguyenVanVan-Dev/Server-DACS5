const express = require('express');
const router = express.Router();
const CheckoutController = require('../App/Controllers/CheckoutController');
const authMiddleware = require('../App/Middleware/Authtization');
router.post('/store',CheckoutController.store);
router.get('/populate',CheckoutController.populateData);



module.exports = router;