const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BikeSchema = Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    spe_level: String,
    category: String,
    weight: Number,
    frame: String,
    fork: String,
    wheels: String,
    wheel_size: String,
    brakes: String,
    groupset: String,
    drivetrain: String,
    suspension: String,
    front_travel: Number,
    seatpost: String,
    brand_site: String,
});

module.exports = mongoose.model('Bike', BikeSchema);
