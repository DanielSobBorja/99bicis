const Bike = require('../models/bike.model');

var bikeAPI = (function () {
    const createBike = async (req, res) => {
        const createdBike = new Bike(req.body);

        const success = await createdBike.save();
        if (success) {
            res.status(200).json(success);
        } else {
            res.status(404).send({ message: 'Could not save bike' });
        }
    };

    const updateBike = async (req, res) => {
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
            let deletedBike = await Bike.findByIdAndDelete(req.params.id);
            if (!deletedBike) {
                return res.status(404).send({ message: 'Bike not found' });
            }
            res.status(200).json({ message: 'Bike deleted' });
        } catch (error) {
            res.status(404).send({ message: 'Could not delete bike' });
        }
    };

    const findById = async (req, res) => {
        let { id } = req.params;

        try {
            let foundBike = await Bike.findById(id);
            if (!foundBike) {
                res.status(404).send({ message: 'Bike not found' });
            } else {
                res.status(200).json(foundBike);
            }
        } catch (error) {
            res.status(500).send({ message: 'Error finding bike' });
        }
    };

    const listAllBikes = async (req, res) => {
        try {
            let bikes = await Bike.find({});

            res.status(200).json(bikes);
        } catch (error) {
            res.status(500).send({ message: 'Error listing bikes' });
        }
    };

    // public API
    return {
        createBike,
        updateBike,
        deleteBike,
        findById,
        listAllBikes,
    };
})();

exports.bikeAPI = bikeAPI;
