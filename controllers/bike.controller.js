const Bike = require('../models/bike.model');

var bikeAPI = (function () {
    const createBike = async function (req, res) {
        let bikeInstance = new Bike(req.body);

        const success = await bikeInstance.save();
        if (success) res.status(200).json(success);
        else res.status(404).send({ message: 'Could not save bike' });
    };

    const updateBike = async function (req, res) {
        let { id } = req.params;
        let updates = req.body;

        try {
            await Bike.findByIdAndUpdate(id, updates);
            let updatedBike = await Bike.findById(id);

            res.status(200).json(updatedBike);
        } catch (error) {
            res.status(404).send({ message: 'Could not update bike' });
        }
    };

    // public API
    return {
        createBike,
        updateBike,
    };
})();

exports.bikeAPI = bikeAPI;
