const express = require('express');
const router = express.Router();
const contractController = require('../App/Controllers/ContractController');
const authMiddleware = require('../App/Middleware/Authtization')
router.post('/store',authMiddleware,contractController.store);
router.get('/show',contractController.show);
// router.get('/detail',authMiddleware,categoryController.detail);
// router.put('/update',authMiddleware,categoryController.update);
router.delete('/delete',authMiddleware,contractController.delete);



module.exports = router;