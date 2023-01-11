const { MongoClient } = require('mongodb');

const bikeCollection = require('./bike-collection');
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.uhusqti.mongodb.net/99bicis-test?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function migrate() {
    try {
        await client.connect();
        const database = client.db('99bicis-test');
        const bikes = database.collection('bikes');

        let bikeCnt = await bikes.estimatedDocumentCount();
        if (bikeCnt > 0)
            await bikes
                .drop()
                .then((succ) => console.log('Could drop bikes:', succ));
        let insert = await bikes.insertMany(bikeCollection);
        console.log(`${insert.insertedCount} bikes inserted`);
    } finally {
        await client.close();
    }
}

migrate().catch(console.dir);
