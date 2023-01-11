const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    address: String,
});
