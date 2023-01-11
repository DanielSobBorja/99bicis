const app = require('../app');
const request = require('supertest');
const { expect } = require('@jest/globals');
const Bike = require('../models/bike.model');

const db = require('../db/mongo-cfg');

describe('Bike CRUD', () => {
    const bikeExample = {
        _id: '63be8b19700af502c4e62317',
        name: 'Mountain Bike',
        price: 900,
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
        brand_site: 'https://www.examplebrand.com/',
    };

    afterAll(async () => {
        setTimeout(() => {
            db.disconnect();
        }, 1000);
    });

    it('should create a bike', async () => {
        return request(app)
            .post('/bike/create')
            .send(bikeExample)
            .then((res) => {
                expect(res.body.name).toBe(bikeExample.name);
                expect(res.statusCode).toBe(200);
            });
    });

    it('should update a bike', async () => {
        const id = '63be8b19700af502c4e62317';

        return request(app)
            .put('/bike/' + id)
            .send({ name: 'New Name', category: 'Road Bike' })
            .then((res) => {
                expect(res.body.name).toBe('New Name');
                expect(res.body.category).toBe('Road Bike');
                expect(res.statusCode).toBe(200);
            });
    });

    it('should delete a bike', async () => {
        let id = '63be8b19700af502c4e62317';

        return request(app)
            .delete('/bike/' + id)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                Bike.findById(id).then((deleted_bike) => {
                    expect(deleted_bike).toBeNull();
                });
            });
    });
});
