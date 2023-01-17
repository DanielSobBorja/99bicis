const Store = require('../models/store.model');
const Inventory = require('../models/inventory.model');

var storeAPI = (function () {
    const createStore = async (req, res) => {
        let newStore = new Store(req.body);
        try {
            const store = await newStore.save();
            res.status(200).json(store);
        } catch (error) {
            res.status(500).send({
                message: `Could not create store: ${error}`,
            });
        }
    };

    const updateStore = async (req, res) => {
        let { id } = req.params;
        let updates = req.body;

        try {
            await Store.findByIdAndUpdate(id, updates);
            let updatedStore = await Store.findById(id);

            res.status(200).json(updatedStore);
        } catch (error) {
            res.status(500).send({
                message: `Could not update store: ${error}`,
            });
        }
    };

    const deleteStore = async (req, res) => {
        try {
            const storeId = req.params.id;
            let deletedStore = await Store.findByIdAndDelete(storeId);
            if (!deletedStore) {
                return res.status(404).send({ message: 'Store not found' });
            }
            await Inventory.deleteMany({ store: storeId });
            res.status(200).json({ message: 'Store deleted' });
        } catch (error) {
            res.status(500).send({
                message: `Could not delete store: ${error}`,
            });
        }
    };

    const findById = async (req, res) => {
        let { id } = req.params;

        try {
            let foundStore = await Store.findById(id);
            if (!foundStore) {
                res.status(404).send({ message: 'Store not found' });
            } else {
                res.status(200).json(foundStore);
            }
        } catch (error) {
            res.status(500).send({ message: `Error finding store: ${error}` });
        }
    };

    const listAllStores = async (req, res) => {
        try {
            let stores = await Store.find({});

            res.status(200).json(stores);
        } catch (error) {
            res.status(500).send({ message: `Error listing stores: ${error}` });
        }
    };

    // public API
    return {
        createStore,
        updateStore,
        deleteStore,
        findById,
        listAllStores,
    };
})();

exports.storeAPI = storeAPI;
