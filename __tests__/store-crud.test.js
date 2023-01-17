const app = require('../app');
const request = require('supertest');
const { expect } = require('@jest/globals');
const Store = require('../models/store.model');
const Bike = require('../models/bike.model');
const Inventory = require('../models/inventory.model');

const db = require('../db/mongo-cfg');

describe('Store CRUD', () => {
    beforeAll(async () => {
        db.connect();
    });

    afterAll(async () => {
        setTimeout(() => {
            db.disconnect();
        }, 1000);
    });

    it('should create a store', async () => {
        const storeExample = {
            name: 'Ejemplita',
            address: 'Plaza de ejemplo',
        };
        return request(app)
            .post('/store/create')
            .send(storeExample)
            .then((res) => {
                expect(res.body.name).toBe(storeExample.name);
                expect(res.body.address).toBe(storeExample.address);
                expect(res.statusCode).toBe(200);
            });
    });

    it('should update a store', async () => {
        const store = await Store.create({
            name: 'Tiendecita',
            address: 'Francia',
        });
        const updates = { address: 'Palma de Mallorca' };
        return request(app)
            .put(`/store/${store._id}`)
            .send(updates)
            .then((res) => {
                expect(res.body.address).toBe(updates.address);
                expect(res.statusCode).toBe(200);
            });
    });

    it('should delete a store and its associated inventories', async () => {
        const bike = await Bike.create({ name: 'aaa' });
        const store = await Store.create({ name: 'bbb' });
        const inventory = await Inventory.create({
            bike: bike._id,
            store: store._id,
            price: 100,
            stock: 10,
        });

        await request(app)
            .delete(`/store/${store._id}`)
            .then(async (res) => {
                expect(res.statusCode).toBe(200);

                const deletedStore = await Store.findById(store._id);
                const deletedInventory = await Inventory.findById(
                    inventory._id
                );

                expect(deletedStore).toBeNull();
                expect(deletedInventory).toBeNull();
            });
    });

    it('should find a store by id', async () => {
        const store = await Store.create({
            name: 'Galicia',
            address: 'Palmita',
        });
        return request(app)
            .get(`/store/${store._id}`)
            .then((res) => {
                expect(res.body.name).toBe(store.name);
                expect(res.statusCode).toBe(200);
            });
    });

    it('should list all stores', async () => {
        return request(app)
            .get('/store/')
            .then((res) => {
                expect(res.body.length).toBeGreaterThan(1);
                expect(res.statusCode).toBe(200);
            });
    });
});
