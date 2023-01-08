const db = require('../db/mongo-cfg');

const testConnectToDb = () => {
    return new Promise((resolve, reject) => {
        db.mongoose.set('strictQuery', false);
        db.mongoose.connect(
            `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.uhusqti.mongodb.net/99bicis-test?retryWrites=true&w=majority`,
            (err) => {
                return err ? reject(err) : resolve();
            }
        );
    });
};

describe('database', () => {
    afterAll(async () => {
        db.disconnect();
    });

    it('should connect to the database', async () => {
        await expect(testConnectToDb()).resolves.toBeUndefined();
    });
});
