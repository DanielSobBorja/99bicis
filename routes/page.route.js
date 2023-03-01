var express = require('express');
var router = express.Router();
var { pageController } = require('../controllers/page.controller');

router.get('/', pageController.getHomePage);
router.get('/rent', pageController.getRentPage);

module.exports = router;
