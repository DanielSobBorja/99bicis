var express = require('express');
var api = express.Router();
var { inventoryAPI } = require('../controllers/inventory.controller');

// -- Get --
// list all available inventories
api.get('/available', inventoryAPI.listAllAvailableInventories);
// -- RENTING --
api.put('/rent/:id', inventoryAPI.rentBike);
api.put('/return/:id', inventoryAPI.returnBike);
// get inventory by id
api.get('/:id', inventoryAPI.findById);
// list all bikes in a store
api.get('/store/:id', inventoryAPI.listAllBikesInStore);
// list all stores containing a bike
api.get('/bike/:id', inventoryAPI.listAllStoresContainingBike);

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
