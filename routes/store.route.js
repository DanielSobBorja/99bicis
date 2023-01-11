var express = require('express');
var api = express.Router();
var { storeAPI } = require('../controllers/store.controller');

// -- Get --
// get bike by id
//api.get('/:id', storeAPI.findById);
// list all bikes
//api.get('/', storeAPI.listAllStores);

// -- Post --
// create bike
api.post('/create', storeAPI.createStore);

// -- Put --
// update bike by id
api.put('/:id', storeAPI.updateStore);

// -- Delete --
// delete bike by id
//api.delete('/:id', storeAPI.deleteStore);

module.exports = api;
