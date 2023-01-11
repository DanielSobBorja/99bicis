const app = require('../app');
const request = require('supertest');
const { expect } = require('@jest/globals');
const Store = require('../models/store.model');

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

    it('should delete a store', async () => {
        let id = '63bf3537ad2346ad50393ee7';

        return request(app)
            .delete(`/store/${id}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                Store.findById(id).then((deleted_store) => {
                    expect(deleted_store).toBeNull();
                });
            });
    });
});
