const express = require('express');
const router = express.Router();
const OrderController = require('../App/Controllers/OrderController');
const authMiddleware = require('../App/Middleware/Authtization')
router.get('/get-all',authMiddleware,OrderController.getAll);
router.get('/detail',authMiddleware,OrderController.detail);
router.put('/update',authMiddleware,OrderController.update);
// router.get('/show',OrderController.show.bind(OrderController));
// router.delete('/delete',authMiddleware,OrderController.delete);



module.exports = router;