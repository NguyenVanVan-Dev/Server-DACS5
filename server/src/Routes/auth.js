const express = require('express');
const router = express.Router();
const authController = require('../App/Controllers/AuthController');
const refeshAuthorization = require('../App/Middleware/RefeshAuthtization');
router.post('/admin/login',authController.login);
router.post('/admin/login/google',authController.loginGoogle);
router.post('/admin/register',authController.register);
router.post('/admin/reset-login',refeshAuthorization,authController.resetLogin);
router.put('/admin/forgot-password',authController.forgotPassword);
router.put('/admin/reset-password',authController.resetPassword);
router.post('/user/login',authController.loginUser);
router.post('/user/register',authController.registerUser);

module.exports = router;