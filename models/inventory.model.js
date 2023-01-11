const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    bike: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    stock: Number,
});
