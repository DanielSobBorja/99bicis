const express = require('express');
const app = express();

var mongoConfig = require('./db/mongo-cfg');
mongoConfig.connect();

var db = mongoConfig.mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bikeRouter = require('./routes/bike.route');
const storeRouter = require('./routes/store.route');
const inventoryRouter = require('./routes/inventory.route');

app.use('/bike', bikeRouter);
app.use('/store', storeRouter);
app.use('/inventory', inventoryRouter);

const pageRouter = require('./routes/page.route');
app.use(express.static('public'));
app.use('/', pageRouter);

app.use((req, res) => res.status(404).json({ error: 'not found' }));

module.exports = app;
