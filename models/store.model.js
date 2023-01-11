const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    address: String,
});
