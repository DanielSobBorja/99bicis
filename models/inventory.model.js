const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    bike: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    price: Number,
    stock: Number,
    availableStock: { type: Number, default: 0 },
    rentedStock: { type: Number, default: 0 },
});

module.exports = mongoose.model('Inventory', InventorySchema);
