var express = require('express');
var api = express.Router();
var { inventoryAPI } = require('../controllers/inventory.controller');

// -- Get --
// list all bikes in a store
api.get('/store/:id', inventoryAPI.listAllBikesInStore);
// list all stores containing a bike
api.get('/bike/:id', inventoryAPI.listAllStoresContainingBike);
// list all available inventories
api.get('/available', inventoryAPI.listAllAvailableInventories);

// -- Post --
// create inventory by store id and bike id, optional stock
api.post('/create', inventoryAPI.createInventory);

// -- Put --
// update inventory by inventory id
api.put('/:id', inventoryAPI.updateInventory);

// -- Delete --
// delete bike by id
api.delete('/:id', inventoryAPI.deleteInventory);

// -- RENTING --
api.put('/:id/rent', inventoryAPI.rentBike);
api.put('/:id/return', inventoryAPI.returnBike);

module.exports = api;
