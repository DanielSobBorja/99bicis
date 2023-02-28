const Inventory = require('../models/inventory.model');

var inventoryAPI = (function () {
    const createInventory = async (req, res) => {
        const params = req.body;

        if (params.rentableStock > params.stock) {
            return res.status(400).send({
                message: 'rentableStock can not be greater than stock',
            });
        }
        if (params.rentedStock > params.rentableStock) {
            return res.status(400).send({
                message: 'rentedStock can not be greater than rentableStock',
            });
        }

        const createdInventory = new Inventory(req.body);
        const success = await createdInventory.save();
        if (success) {
            res.status(200).json(success);
        } else {
            res.status(500).send({
                message: `Could not save inventory: ${error}`,
            });
        }
    };

    const updateInventory = async (req, res) => {
        let { id } = req.params;
        let updates = req.body;

        if (updates.rentableStock > updates.stock) {
            return res.status(400).send({
                message: 'rentableStock can not be greater than stock',
            });
        }
        if (updates.rentedStock > updates.rentableStock) {
            return res.status(400).send({
                message: 'rentedStock can not be greater than rentableStock',
            });
        }

        try {
            await Inventory.findByIdAndUpdate(id, updates);
            let updatedInventory = await Inventory.findById(id);

            res.status(200).json(updatedInventory);
        } catch (error) {
            res.status(500).send({
                message: `Could not update inventory: ${error}`,
            });
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
            res.status(500).send({
                message: `Could not delete inventory: ${error}`,
            });
        }
    };

    const listAllAvailableInventories = async (req, res) => {
        try {
            let inventories = await Inventory.find({
                rentableStock: { $gt: 0 },
            })
                .populate('bike')
                .populate('store');

            res.status(200).json(inventories);
        } catch (error) {
            res.status(500).send({
                message: `Error listing available inventories: ${error}`,
            });
        }
    };

    const rentBike = async (req, res) => {
        const inventoryId = req.params.id;
        const { quantity } = req.body;

        try {
            const inventory = await Inventory.findById(inventoryId);
            if (!inventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
            if (inventory.rentableStock - inventory.rentedStock < quantity) {
                return res
                    .status(400)
                    .json({ message: 'Not enough rentable stock' });
            }
            inventory.rentedStock += quantity;
            await inventory.save();
            res.status(200).json({
                message: `Bike${quantity > 1 ? 's' : ''} rented`,
                ...inventory,
            });
        } catch (error) {
            res.status(500).json({ message: 'Could not rent bike' });
        }
    };

    const returnBike = async function (req, res) {
        const inventoryId = req.params.id;
        const { quantity } = req.body;
        try {
            const inventory = await Inventory.findById(inventoryId);
            if (!inventory) {
                return res.status(404).send({ message: 'Inventory not found' });
            }
            inventory.rentedStock -= quantity;
            if (inventory.rentedStock < 0) {
                return res.status(400).send({
                    message: 'Cannot return more bikes than rented bikes',
                });
            }
            await inventory.save();
            res.status(200).json({
                message: `Bike${quantity > 1 ? 's' : ''} returned`,
                ...inventory,
            });
        } catch (error) {
            res.status(500).send({
                message: `Could not return bike: ${error}`,
            });
        }
    };

    const listAllBikesInStore = async (req, res) => {
        const storeId = req.params.id;

        try {
            const foundBikes = await Inventory.find({
                store: storeId,
            }).populate('bike');
            res.status(200).json(foundBikes);
        } catch (error) {
            res.status(500).send({
                message: `Could not list bikes: ${error}`,
            });
        }
    };

    const listAllStoresContainingBike = async (req, res) => {
        const bikeId = req.params.id;

        try {
            const foundStores = await Inventory.find({
                bike: bikeId,
            }).populate('store');
            res.status(200).json(foundStores);
        } catch (error) {
            res.status(500).send({
                message: `Could not list stores: ${error}`,
            });
        }
    };

    // public API
    return {
        createInventory,
        updateInventory,
        deleteInventory,
        rentBike,
        returnBike,
        listAllBikesInStore,
        listAllStoresContainingBike,
        listAllAvailableInventories,
    };
})();

exports.inventoryAPI = inventoryAPI;
