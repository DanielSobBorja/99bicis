//Set up mongoose connection
var mongoose = require('mongoose');

var databaseUri = {
    production: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.uhusqti.mongodb.net/99bicis?retryWrites=true&w=majority`,

    development: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.uhusqti.mongodb.net/99bicis?retryWrites=true&w=majority`,

    test: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.uhusqti.mongodb.net/99bicis-test?retryWrites=true&w=majority`,
};

module.exports = {
    mongoose,
    connect: () => {
        if (!process.env.ATLAS_USER || !process.env.ATLAS_PASSWORD) {
            console.error(
                'Faltan las variables de entorno ATLAS_USER o ATLAS_PASSWORD'
            );
            process.exit(1);
        }
        mongoose.Promise = Promise;
        mongoose.set('strictQuery', false);
        mongoose.connect(databaseUri[process.env.NODE_ENV], {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    },
    disconnect: (done) => {
        mongoose.disconnect(done);
    },
};
