const app = require('../app');
const request = require('supertest');
const { expect } = require('@jest/globals');
const Inventory = require('../models/inventory.model');
const Store = require('../models/store.model');
const Bike = require('../models/bike.model');

const db = require('../db/mongo-cfg');

describe('Inventory CRUD', () => {
    beforeAll(async () => {
        db.connect();
    });

    afterAll(async () => {
        setTimeout(() => {
            db.disconnect();
        }, 1000);
    });

    it('should create an inventory', async () => {
        const inventoryExample = {
            bike: '63be79920a25c43ffcd60b3b',
            store: '63bf14c652bb8ecabbb751b6',
        };
        return request(app)
            .post('/inventory/create')
            .send(inventoryExample)
            .then((res) => {
                expect(res.body.bike).toBe(inventoryExample.bike);
                expect(res.body.store).toBe(inventoryExample.store);
                expect(res.statusCode).toBe(200);
            });
    });

    //TODO: Should fail create if there is already another inventory with the same store and bike

    it('should update an inventory', async () => {
        const inventory = await Inventory.create({
            bike: '63be79920a25c43ffcd60b3b',
            store: '63bf14c652bb8ecabbb751b6',
        });
        const updates = { stock: 15, availableStock: 10 };
        return request(app)
            .put(`/inventory/${inventory._id}`)
            .send(updates)
            .then((res) => {
                expect(res.body.stock).toBe(updates.stock);
                expect(res.body.availableStock).toBe(updates.availableStock);
                expect(res.statusCode).toBe(200);
            });
    });

    //TODO: Should fail update if there is already another inventory with the same store and bike

    it('should delete an inventory', async () => {
        let id = '63c43286872b1946ee332770';

        return request(app)
            .delete(`/inventory/${id}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                Inventory.findById(id).then((deleted_inventory) => {
                    expect(deleted_inventory).toBeNull();
                });
            });
    });

    it('should rent a bike and decrease available stock', async () => {
        const store = await Store.create({
            name: 'Example Store',
            address: 'Example Street',
        });
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
            brand_site: 'https://www.examplebrand.com/',
        });
        const inventory = await Inventory.create({
            bike: bike._id,
            store: store._id,
            price: 100,
            stock: 10,
            availableStock: 10,
        });

        return request(app)
            .put(`/inventory/${inventory._id}/rent`)
            .send({ quantity: 2 })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                Inventory.findById(inventory._id).then((inventory) => {
                    expect(inventory.availableStock).toBe(8);
                });
            });
    });

    it('should return a bike and increase available stock', async () => {
        const store = await Store.create({
            name: 'Test Store',
            address: 'Test Address',
        });
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
            brand_site: 'https://www.examplebrand.com/',
        });
        const inventory = await Inventory.create({
            bike: bike._id,
            store: store._id,
            price: 1000,
            stock: 10,
            availableStock: 8,
        });
        return request(app)
            .put(`/inventory/${inventory._id}/return`)
            .send({ quantity: 2 })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                Inventory.findById(inventory._id).then((inventory) => {
                    expect(inventory.availableStock).toBe(10);
                });
            });
    });
});
