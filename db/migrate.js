const { MongoClient } = require('mongodb');

const bikeCollection = require('./collections/bike.collection');
const storeCollection = require('./collections/store.collection');
const inventoryCollection = require('./collections/inventory.collection');
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.uhusqti.mongodb.net/99bicis-test?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

// Mocking test database
async function migrate() {
    try {
        await client.connect();
        const database = client.db('99bicis-test');
        const bikes = database.collection('bikes');
        const stores = database.collection('stores');
        const inventories = database.collection('inventories');
        let success;

        let bikeCnt = await bikes.estimatedDocumentCount();
        if (bikeCnt > 0) success = await bikes.drop();
        console.log('Could drop bikes:', success);
        let insert = await bikes.insertMany(bikeCollection);
        console.log(`${insert.insertedCount} bikes inserted`);

        let storeCnt = await stores.estimatedDocumentCount();
        if (storeCnt > 0) success = await stores.drop();
        console.log('Could drop storess:', success);
        insert = await stores.insertMany(storeCollection);
        console.log(`${insert.insertedCount} stores inserted`);

        let inventoryCnt = await inventories.estimatedDocumentCount();
        if (inventoryCnt > 0) success = await inventories.drop();
        console.log('Could drop inventories:', success);
        insert = await inventories.insertMany(inventoryCollection);
        console.log(`${insert.insertedCount} inventories inserted`);
    } finally {
        await client.close();
    }
}

migrate().catch(console.dir);

module.exports = migrate;
