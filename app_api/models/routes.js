var mongoose = require('mongoose');

var infoSchema = new mongoose.Schema({
    type: String,
    distance: String,
    number: String,
    timeTrip: String,
    space: String,
    active: String,
    vehicle: String,
    company: String
});

var routeSchema = new mongoose.Schema({
    oderRoute: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    schedule: [String],
    info: infoSchema,
    idRoute: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Route', routeSchema);
