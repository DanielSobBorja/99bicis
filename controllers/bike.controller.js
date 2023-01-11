const Bike = require('../models/bike.model');

var bikeAPI = (function () {
    const createBike = async function (req, res) {
        let createdBike = new Bike(req.body);

        const success = await createdBike.save();
        if (success) {
            res.status(200).json(success);
        } else {
            res.status(404).send({ message: 'Could not save bike' });
        }
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

    const deleteBike = async (req, res) => {
        try {
            const deletedBike = await Bike.findByIdAndDelete(req.params.id);
            if (!deletedBike) {
                return res.status(404).send({ message: 'Bike not found' });
            }
            res.status(200).json({ message: 'Bike deleted' });
        } catch (error) {
            res.status(404).send({ message: 'Could not delete bike' });
        }
    };

    // public API
    return {
        createBike,
        updateBike,
        deleteBike,
    };
})();

exports.bikeAPI = bikeAPI;
