const Store = require('../models/store.model');

var storeAPI = (function () {
    const createStore = async (req, res) => {
        let newStore = new Store(req.body);
        try {
            const store = await newStore.save();
            res.status(200).json(store);
        } catch (error) {
            res.status(404).send({ message: 'Could not create store' });
        }
    };

    // public API
    return {
        createStore,
    };
})();

exports.storeAPI = storeAPI;
