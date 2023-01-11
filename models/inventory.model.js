const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    bike: { type: Schema.Types.ObjectId, ref: 'Bike' },
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    stock: Number,
    price: Number,
});
