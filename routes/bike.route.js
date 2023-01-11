var express = require('express');
var router = express.Router();
var { bikeAPI } = require('../controllers/bike.controller');

// -- Get --
// get bike by id
//router.get('/:id', bikeAPI.findById);

// -- Post --
// create bike
router.post('/create', bikeAPI.createBike);

// -- Put --
// update bike by id
//api.put('/:id', bikeAPI.updateBike);

// -- Delete --
// delete bike by id
//router.delete('/:id', bikeAPI.deleteBike);

module.exports = router;
