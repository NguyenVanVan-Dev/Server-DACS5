const express = require('express');
const router = express.Router();
const CheckoutController = require('../app/Controllers/CheckoutController');
const authMiddleware = require('../app/Middleware/Authtization');
router.post('/store',CheckoutController.store);
router.get('/populate',CheckoutController.populateData);



module.exports = router;