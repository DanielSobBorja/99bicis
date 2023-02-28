const app = require('../app');
const request = require('supertest');
const { expect } = require('@jest/globals');
const Bike = require('../models/bike.model');
const Store = require('../models/store.model');
const Inventory = require('../models/inventory.model');

const db = require('../db/mongo-cfg');

describe('Bike CRUD', () => {
    beforeAll(async () => {
        db.connect();
    });

    afterAll(async () => {
        setTimeout(() => {
            db.disconnect();
        }, 1000);
    });

    it('should create a bike', async () => {
        const bikeExample = {
            name: 'Mountain Bike',
            spe_level: 'Level 3',
            category: 'mtb',
            weight: 12.5,
            frame: 'Aluminum',
            fork: 'Suspension',
            wheels: 'Alloy',
            wheel_size: '29',
            brakes: 'Disc',
            groupset: 'Shimano',
            drivetrain: '1x10',
            suspension: 'Air',
            front_travel: 120,
            seatpost: 'Dropper',
            brand: 'https://www.examplebrand.com/',
        };
        const res = await request(app).post('/bike/create').send(bikeExample);

        expect(res.body.name).toBe(bikeExample.name);
        expect(res.statusCode).toBe(200);
    });

    it('should update a bike', async () => {
        const id = '63be79920a25c43ffcd60b3b';

        const res = await request(app)
            .put(`/bike/${id}`)
            .send({ name: 'New Name', category: 'Road Bike' });

        expect(res.body.name).toBe('New Name');
        expect(res.body.category).toBe('Road Bike');
        expect(res.statusCode).toBe(200);
    });

    it('should delete a bike and its associated inventories', async () => {
        const bike = await Bike.create({ name: 'aaa' });
        const store = await Store.create({ name: 'bbb' });
        const inventory = await Inventory.create({
            bike: bike._id,
            store: store._id,
            price: 100,
            stock: 10,
        });

        const res = await request(app).delete(`/bike/${bike._id}`);

        expect(res.statusCode).toBe(200);

        const deletedBike = await Bike.findById(bike._id);
        const deletedInventory = await Inventory.findById(inventory._id);

        expect(deletedBike).toBeNull();
        expect(deletedInventory).toBeNull();
    });

    it('should find a bike by id', async () => {
        const bike = await Bike.create({
            name: 'Road Bike',
            spe_level: 'Level 2',
            category: 'road',
            weight: 9.5,
            frame: 'Carbon Fiber',
            fork: 'Carbon Fiber',
            wheels: 'Carbon Fiber',
            wheel_size: '28',
            brakes: 'Rim',
            groupset: 'Shimano',
            drivetrain: '2x11',
            suspension: 'None',
            front_travel: 0,
            seatpost: 'Carbon Fiber',
            brand: 'https://www.examplebrand.com/',
        });
        const res = await request(app).get(`/bike/${bike._id}`);

        expect(res.body.name).toBe(bike.name);
        expect(res.statusCode).toBe(200);
    });

    it('should list all bikes', async () => {
        const res = await request(app).get('/bike/');

        expect(res.body.length).toBeGreaterThan(1);
        expect(res.statusCode).toBe(200);
    });

    /*it('should return filtered bikes', async () => {
        const bike1 = await Bike.create({
            name: 'Trek Madone',
            category: 'Road',
            price: 2000,
        });
        const bike2 = await Bike.create({
            name: 'Giant Defy',
            brand: 'Giant',
            category: 'Road',
            price: 1500,
        });
        const bike3 = await Bike.create({
            name: 'Specialized Stumpjumper',
            brand: 'Specialized',
            category: 'Mountain',
            price: 3000,
        });
        const bike4 = await Bike.create({
            name: 'Trek Madone',
            brand: 'Trek',
            price: 3000,
        });
        const store1 = await Store.create({ name: 'ccc' });
        const store2 = await Store.create({ name: 'ddd' });
        const inventory1 = await Inventory.create({
            bike: bike1._id,
            store: store1._id,
            availableStock: 2,
        });
        await Inventory.create({
            bike: bike2._id,
            store: store1._id,
            availableStock: 0,
        });
        await Inventory.create({
            bike: bike3._id,
            store: store2._id,
            availableStock: 5,
        });
        await Inventory.create({
            bike: bike4._id,
            store: store2._id,
            availableStock: 0,
        });

        const res = await request(app)
            .put(`/bike/bike`)
            .send({ name: 'Trek', stock: true });

        expect(res.statusCode).toBe(200);
        expect(response.body).toEqual([
            {
                _id: inventory1._id.toString(),
                bike: {
                    _id: bike1._id.toString(),
                    name: bike1.name,
                    brand: bike1.brand,
                    category: bike1.category,
                    price: bike1.price,
                },
                availableStock: inventory1.availableStock,
            },
        ]);
    });*/
});
