var express = require('express');
var router = express.Router();
var { inventoryAPI } = require('../controllers/inventory.controller');

router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.params);

    next();
});

// -- Get --
// list all bikes in a store
// api.get('/bikes/:id', bikeAPI.listAllBikesInStore);
// list all stores containing a bike
// api.get('/stores/:id', bikeAPI.listAllStoresContainingBike);

// -- Post --
// create inventory by store id and bike id, optional stock
//router.post('/inv', inventoryAPI.createInventory);

// -- Put --
// update inventory by inventory id
//api.put('/inv/:id', inventoryAPI.updateInventory);

// -- Delete --
// delete bike by id
//router.delete('/inv/:id', inventoryAPI.deleteInventory);

module.exports = router;
