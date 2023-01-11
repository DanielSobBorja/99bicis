const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = Schema({
    _id: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    address: String,
});

module.exports = mongoose.model('Store', StoreSchema);
