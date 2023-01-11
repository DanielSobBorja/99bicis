const app = require('../app');
const request = require('supertest');
const { expect } = require('@jest/globals');
const Bike = require('../models/bike.model');

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
            brand_site: 'https://www.examplebrand.com/',
        };
        return request(app)
            .post('/bike/create')
            .send(bikeExample)
            .then((res) => {
                expect(res.body.name).toBe(bikeExample.name);
                expect(res.statusCode).toBe(200);
            });
    });

    it('should update a bike', async () => {
        const id = '63be79920a25c43ffcd60b3b';

        return request(app)
            .put(`/bike/${id}`)
            .send({ name: 'New Name', category: 'Road Bike' })
            .then((res) => {
                expect(res.body.name).toBe('New Name');
                expect(res.body.category).toBe('Road Bike');
                expect(res.statusCode).toBe(200);
            });
    });

    it('should delete a bike', async () => {
        let id = '63be79920a25c43ffcd60b3b';

        return request(app)
            .delete(`/bike/${id}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                Bike.findById(id).then((deleted_bike) => {
                    expect(deleted_bike).toBeNull();
                });
            });
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
            brand_site: 'https://www.examplebrand.com/',
        });
        return request(app)
            .get(`/bike/${bike._id}`)
            .then((res) => {
                expect(res.body.name).toBe(bike.name);
                expect(res.statusCode).toBe(200);
            });
    });

    it('should list all bikes', async () => {
        return request(app)
            .get('/bike/')
            .then((res) => {
                expect(res.body.length).toBeGreaterThan(1);
                expect(res.statusCode).toBe(200);
            });
    });
});
