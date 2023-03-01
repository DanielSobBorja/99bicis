const Bike = require('../models/bike.model');
const Inventory = require('../models/inventory.model');

var bikeAPI = (function () {
    const createBike = async (req, res) => {
        const newBike = new Bike(req.body);
        try {
            const store = await newBike.save();
            res.status(200).json(store);
        } catch (error) {
            res.status(500).send({ message: `Could not save bike: ${error}` });
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
            res.status(500).send({
                message: `Could not update bike: ${error}`,
            });
        }
    };

    const deleteBike = async (req, res) => {
        try {
            const bikeId = req.params.id;
            let deletedBike = await Bike.findByIdAndDelete(bikeId);
            if (!deletedBike) {
                return res.status(404).send({ message: 'Bike not found' });
            }
            await Inventory.deleteMany({ bike: bikeId });
            res.status(200).json({ message: 'Bike deleted' });
        } catch (error) {
            res.status(500).send({
                message: `Could not delete bike: ${error}`,
            });
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
            res.status(500).send({ message: `Error finding bike: ${error}` });
        }
    };

    const listAllBikes = async (req, res) => {
        try {
            let bikes = await Bike.find({});

            res.status(200).json(bikes);
        } catch (error) {
            res.status(500).send({ message: `Error listing bikes: ${error}` });
        }
    };

    // public API
    return {
        createBike,
        updateBike,
        deleteBike,
        findById,
        listAllBikes,
        filterBikes,
    };
})();

exports.bikeAPI = bikeAPI;
