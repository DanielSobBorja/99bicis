var express = require('express');
var router = express.Router();
var { inventoryAPI } = require('../controllers/inventory.controller');

router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.params);

    next();
});

// -- Get --
// get inventories by store id
// get inventories by bike id

// -- Post --
// create inventory by store id and bike id
//router.post('/inv', inventoryAPI.createInventory);

// -- Put --
// update inventory by inventory id
//api.put('/inv/:id', inventoryAPI.updateInventory);

// -- Delete --
// delete bike by id
//router.delete('/inv/:id', inventoryAPI.deleteInventory);

module.exports = router;
