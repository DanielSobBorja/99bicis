const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const faker = require('faker');

const Bike = require('../models/bike.model');
const Store = require('../models/store.model');
const Inventory = require('../models/inventory.model');

const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.uhusqti.mongodb.net/99bicis?retryWrites=true&w=majority`;

// Conexión a la base de datos
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// ESTE SEEDER CONTIENE CODIGO NO APTO PARA PRODUCCION (pero lo uso igualmente)

Inventory.deleteMany({}, function (err) {
    if (err) console.error(err);
    else console.log("Emptied 'Inventory'");
});

Store.deleteMany({}, function (err) {
    if (err) console.error(err);
    else console.log("Emptied 'Store'");
});

Bike.deleteMany({}, function (err) {
    if (err) console.error(err);
    else console.log("Emptied 'Bike'");
});

// Genera 10 tiendas
const stores = Array.from({ length: 10 }, () => ({
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
}));

// Genera 100 bicis
const bikes = Array.from({ length: 100 }, () => ({
    name: faker.commerce.productName(),
    spe_level: faker.commerce.productAdjective(),
    category: faker.random.arrayElement([
        'mtb',
        'cb',
        'road',
        'grav',
        'el',
        'bmx',
    ]),
    weight: parseFloat(faker.datatype.number({ min: 5, max: 30 })),
    frame: faker.commerce.productMaterial(),
    fork: faker.commerce.productMaterial(),
    wheels: faker.commerce.productMaterial(),
    wheel_size: faker.random.arrayElement(['26"', '27.5"', '29"']),
    brakes: faker.commerce.product(),
    groupset: faker.commerce.productName(),
    drivetrain: faker.commerce.productMaterial(),
    suspension: faker.commerce.productMaterial(),
    front_travel: faker.datatype.number({ min: 80, max: 200 }),
    seatpost: faker.commerce.productMaterial(),
    brand: faker.random.arrayElement(['Spec', 'Trk', 'Gt', 'Cdale', 'Sct']),
}));

// Crea las tiendas y las bicis en la base de datos
Promise.all([Store.create(stores), Bike.create(bikes)])
    .then(([stores, bikes]) => {
        const inventories = [];

        // Genera un inventario para cada combinación de tienda y bici
        stores.forEach((store) => {
            bikes.forEach((bike) => {
                const stock = faker.datatype.number({ min: 0, max: 40 });
                const rentableStock = faker.datatype.number({
                    min: 0,
                    max: stock,
                });
                const rentedStock = faker.datatype.number({
                    min: 0,
                    max: rentableStock,
                });
                inventories.push({
                    store: store._id,
                    bike: bike._id,
                    price: parseFloat(faker.commerce.price(50, 3100)),
                    stock: stock,
                    rentableStock: rentableStock,
                    rentedStock: rentedStock,
                });
            });
        });

        // Crea los inventarios en la base de datos
        Inventory.create(inventories).then(() => {
            console.log('Base de datos poblada con éxito');
            mongoose.disconnect();
        });
    })
    .catch((error) => {
        console.error('Error al poblar la base de datos', error);
    });
