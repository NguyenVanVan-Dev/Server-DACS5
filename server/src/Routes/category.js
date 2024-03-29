const express = require('express');
const router = express.Router();
const categoryController = require('../App/Controllers/CategoryController');
const authMiddleware = require('../App/Middleware/Authtization')
router.post('/store',authMiddleware,categoryController.store);
router.get('/show',categoryController.show.bind(categoryController));
router.get('/detail',authMiddleware,categoryController.detail);
router.put('/update',authMiddleware,categoryController.update);
router.delete('/delete',authMiddleware,categoryController.delete);



module.exports = router;