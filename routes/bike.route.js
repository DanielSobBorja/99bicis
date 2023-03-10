var express = require('express');
var api = express.Router();
var { bikeAPI } = require('../controllers/bike.controller');

// -- Get --
// get bike by id
api.get('/:id', bikeAPI.findById);
// list all bikes
api.get('/', bikeAPI.listAllBikes);

// -- Post --
// create bike
api.post('/create', bikeAPI.createBike);

// -- Put --
// update bike by id
api.put('/:id', bikeAPI.updateBike);
// filter bikes

// -- Delete --
// delete bike by id
api.delete('/:id', bikeAPI.deleteBike);

module.exports = api;
