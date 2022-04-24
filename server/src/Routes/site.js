const express = require('express');
const router = express.Router();
const siteController = require('../App/Controllers/SiteController');

router.get('/',siteController.index);
router.get('/relay',siteController.testRelay);

module.exports = router;