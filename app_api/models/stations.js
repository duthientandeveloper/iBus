var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
	lat: {
		type: Number,
		required: true
	},
	lng: {
		type: Number,
		required: true
	}
});

var stationSchema = new mongoose.Schema({
	idRoute: {
		type: Number,
		required: true
	},
	id: {
		type: Number,
		required: true
	},
	symbol: {
		type: String,
		required: true
	},
	polyline: [locationSchema],
	isGo: {
		type: Boolean,
		required: true
	},
	oder: {
		type: Number,
		required: true
	},
	distance: {
		type: Number,
		required: true
	},
	name: {
		type: String
	},
	lat: {
		type: Number,
		required: true
	},
	lng: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Staion',stationSchema);