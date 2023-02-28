var express = require('express');
var router = express.Router();
var { pageController } = require('../controllers/page.controller');

router.get('/', pageController.renderBikes);

module.exports = router;
