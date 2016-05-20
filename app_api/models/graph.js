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
var plSchema = new mongoose.Schema({
	pl:[locationSchema]
});


var graphSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	name:String,
	polyline:[plSchema],
	distance: [Number],
	belongRoute:[Number],
	nextStation:[Number],
	lat:Number,
	lng:Number
});
graphSchema.index({name:'text'});
module.exports = mongoose.model('Graph',graphSchema);
