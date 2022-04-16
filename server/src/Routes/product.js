const express = require('express');
const router = express.Router();
const productController = require('../app/Controllers/ProductController');
const authMiddleware = require('../app/Middleware/Authtization');
const Uploadfile = require('../app/Middleware/Uploadfile');

router.post('/store',authMiddleware,async (req,res, next)=>{
    Uploadfile('image')(req, res, function (err) {
        if (err) {
            let listError = {};
            listError ={
                image:err.message, 
            }
            req.file =  undefined;
        }
        next();
    });
},productController.store);
router.get('/show',productController.show);
router.get('/detail',productController.detail);
router.put('/update',authMiddleware,async (req,res, next)=>{
    Uploadfile('new_image')(req, res, function (err) {
        if (err) {
            let listError = {};
            listError ={
                image:err.message, 
            }
            req.file =  undefined;
        }
        next();
    });
},productController.update);
router.get('/populate',productController.populateData);
router.delete('/delete',authMiddleware,productController.delete);



module.exports = router;