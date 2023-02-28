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

    const filterBikes = async (req, res) => {
        try {
            const { name, brand, category, price, stock } = req.body;
            console.log('A');
            const bikes = await Bike.find({
                name: { $regex: name, $options: 'i', $exists: true },
                brand: { $regex: brand, $options: 'i', $exists: true },
                category: { $regex: category, $options: 'i', $exists: true },
                price: { $lte: price, $exists: true },
            });
            console.log('B');
            let filterStock = {};
            if (stock) {
                console.log('C');
                // Buscar inventarios con stock mayor a cero
                filterStock = { availableStock: { $gt: 0 } };
            }
            console.log('D');
            const inventories = await Inventory.find(filterStock);
            console.log('E');
            // Filtrar aquellos inventarios que tengan la bici de bikes
            const filteredInventories = inventories.filter((inventory) => {
                console.log('F');
                return bikes.some((bike) => {
                    console.log('G');
                    return bike._id.equals(inventory.bike);
                });
            });
            console.log('H');
            const inventoriesWithBikes = await Inventory.populate(
                filteredInventories,
                { path: 'bike' }
            );
            console.log('I');
            res.status(200).json(inventoriesWithBikes);
        } catch (error) {
            res.status(500).json({
                message: `Error filtering bikes: ${error}`,
            });
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
