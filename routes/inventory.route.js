var express = require('express');
var api = express.Router();
var { inventoryAPI } = require('../controllers/inventory.controller');

// -- Get --
// list all bikes in a store
// api.get('/bikes/:id', bikeAPI.listAllBikesInStore);
// list all stores containing a bike
// api.get('/stores/:id', bikeAPI.listAllStoresContainingBike);

// -- Post --
// create inventory by store id and bike id, optional stock
api.post('/create', inventoryAPI.createInventory);

// -- Put --
// update inventory by inventory id
api.put('/:id', inventoryAPI.updateInventory);

// -- Delete --
// delete bike by id
api.delete('/:id', inventoryAPI.deleteInventory);

module.exports = api;
