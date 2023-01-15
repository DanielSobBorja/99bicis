const Inventory = require('../models/inventory.model');

var inventoryAPI = (function () {
    const createInventory = async (req, res) => {
        const createdInventory = new Inventory(req.body);

        const success = await createdInventory.save();
        if (success) {
            res.status(200).json(success);
        } else {
            res.status(500).send({ message: 'Could not save inventory' });
        }
    };

    const updateInventory = async (req, res) => {
        let { id } = req.params;
        let updates = req.body;

        try {
            await Inventory.findByIdAndUpdate(id, updates);
            let updatedInventory = await Inventory.findById(id);

            res.status(200).json(updatedInventory);
        } catch (error) {
            res.status(500).send({ message: 'Could not update inventory' });
        }
    };

    const deleteInventory = async (req, res) => {
        try {
            let deletedInventory = await Inventory.findByIdAndDelete(
                req.params.id
            );
            if (!deletedInventory) {
                return res.status(404).send({ message: 'Inventory not found' });
            }
            res.status(200).json({ message: 'Inventory deleted' });
        } catch (error) {
            res.status(500).send({ message: 'Could not delete inventory' });
        }
    };

    // public API
    return {
        createInventory,
        updateInventory,
        deleteInventory,
    };
})();

exports.inventoryAPI = inventoryAPI;
