const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BikeSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    price: Number,
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

/*
BikeSchema.statics.findById = function (id) {
    return this.findOne({ _id: id });
};*/

module.exports = mongoose.model('Bike', BikeSchema);
