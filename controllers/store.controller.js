const Store = require('../models/store.model');

var storeAPI = (function () {
    const createStore = async (req, res) => {
        let newStore = new Store(req.body);
        try {
            const store = await newStore.save();
            res.status(200).json(store);
        } catch (error) {
            res.status(500).send({ message: 'Could not create store' });
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
            res.status(500).send({ message: 'Could not update store' });
        }
    };

    const deleteStore = async (req, res) => {
        try {
            let deletedStore = await Store.findByIdAndDelete(req.params.id);
            if (!deletedStore) {
                return res.status(404).send({ message: 'Store not found' });
            }
            res.status(200).json({ message: 'Store deleted' });
        } catch (error) {
            res.status(500).send({ message: 'Could not delete store' });
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
            res.status(500).send({ message: 'Error finding store' });
        }
    };

    const listAllStores = async (req, res) => {
        try {
            let stores = await Store.find({});

            res.status(200).json(stores);
        } catch (error) {
            res.status(500).send({ message: 'Error listing stores' });
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
