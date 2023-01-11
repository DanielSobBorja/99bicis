const express = require('express');
const app = express();

var mongoConfig = require('./db/mongo-cfg');
mongoConfig.connect();

var db = mongoConfig.mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bikeRouter = require('./routes/bike.route');

app.use('/bike', bikeRouter);

app.use((req, res) => res.status(404).json({ error: 'not found' }));

module.exports = app;
