const express = require('express');
const router = express.Router();
const contractController = require('../app/Controllers/ContractController');
const authMiddleware = require('../app/Middleware/Authtization')
router.post('/store',authMiddleware,contractController.store);
router.get('/show',authMiddleware,contractController.show);
// router.get('/detail',authMiddleware,categoryController.detail);
// router.put('/update',authMiddleware,categoryController.update);
router.delete('/delete',authMiddleware,contractController.delete);



module.exports = router;