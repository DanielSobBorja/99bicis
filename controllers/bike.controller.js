const Bike = require('../models/bike.model');

var bikeAPI = (function () {
    // create bike
    const createBike = async function (req, res) {
        let bikeInstance = new Bike(req.body);

        const success = await bikeInstance.save();
        if (success) res.status(200).json(success);
        else res.status(404).send({ message: 'Could not save bike' });
    };

    // public API
    return {
        createBike,
    };
})();

exports.bikeAPI = bikeAPI;
