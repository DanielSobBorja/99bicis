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
        const res = await request(app)
            .post('/inventory/create')
            .send(inventoryExample);

        expect(res.body.bike).toBe(inventoryExample.bike);
        expect(res.body.store).toBe(inventoryExample.store);
        expect(res.statusCode).toBe(200);
    });

    //TODO: Should fail create if there is already another inventory with the same store and bike

    it('should update an inventory', async () => {
        const inventory = await Inventory.create({
            bike: '63be79920a25c43ffcd60b3b',
            store: '63bf14c652bb8ecabbb751b6',
        });
        const updates = { stock: 15, rentableStock: 10 };
        const res = await request(app)
            .put(`/inventory/${inventory._id}`)
            .send(updates);

        expect(res.body.stock).toBe(updates.stock);
        expect(res.body.rentableStock).toBe(updates.rentableStock);
        expect(res.statusCode).toBe(200);
    });

    it('should delete an inventory', async () => {
        let id = '63c43286872b1946ee332770';

        const res = await request(app).delete(`/inventory/${id}`);

        expect(res.statusCode).toBe(200);
        Inventory.findById(id).then((deleted_inventory) => {
            expect(deleted_inventory).toBeNull();
        });
    });

    it('should return all bikes from a store', async () => {
        const store = await Store.create({
            name: 'My Store',
            address: '123 Main St',
        });
        const bike1 = await Bike.create({
            name: 'Bike 1',
            spe_level: 'Level 1',
            category: 'mountain',
        });
        const bike2 = await Bike.create({
            name: 'Bike 2',
            spe_level: 'Level 2',
            category: 'road',
        });
        const bike3 = await Bike.create({
            name: 'Bike 3',
            spe_level: 'Level 3',
            category: 'city',
        });

        await Inventory.create({
            store: store._id,
            bike: bike1._id,
            price: 200,
            stock: 10,
            rentableStock: 6,
            rentedStock: 2,
        });
        await Inventory.create({
            store: store._id,
            bike: bike2._id,
            price: 300,
            stock: 15,
            rentableStock: 10,
            rentedStock: 5,
        });
        await Inventory.create({
            store: store._id,
            bike: bike3._id,
            price: 400,
            stock: 20,
            rentableStock: 20,
            rentedStock: 0,
        });

        const res = await request(app).get(`/inventory/store/${store._id}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
        expect(res.body[0].bike.name).toBe('Bike 1');
        expect(res.body[1].bike.name).toBe('Bike 2');
        expect(res.body[2].bike.name).toBe('Bike 3');
    });

    it('should list all stores containing a bike', async () => {
        const bike = await Bike.create({
            name: 'Road Bike',
            spe_level: 'Level 2',
            category: 'road',
            weight: 9.5,
        });
        const store1 = await Store.create({
            name: 'Example Store 1',
            address: '123 Example St',
        });
        const store2 = await Store.create({
            name: 'Example Store 2',
            address: '123 Example St',
        });
        await Inventory.create({
            bike: bike._id,
            store: store1._id,
            price: 900,
            stock: 10,
        });
        await Inventory.create({
            bike: bike._id,
            store: store2._id,
            price: 800,
            stock: 7,
        });

        const res = await request(app).get(`/inventory/bike/${bike._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].store.name).toBe(store1.name);
        expect(res.body[1].store.name).toBe(store2.name);
    });
});
