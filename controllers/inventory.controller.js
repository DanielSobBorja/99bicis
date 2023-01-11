const Inventory = require('../models/inventory.model');

var inventoryAPI = (function () {
    // get bike
    const createInventory = function (req, res, next) {
        let inventoryInstance = new Inventory(req.body);

        inventoryInstance.save(function (err) {
            if (err) return next(err);
        });

        res.status(200).type('json').json(inventoryInstance);
    };

    // public API
    return {
        createInventory,
    };
})();

exports.inventoryAPI = inventoryAPI;
