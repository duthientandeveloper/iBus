var mongoose = require('mongoose');

var graphSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	distance: [Number],
	belongRoute:[Number],
	nextStation:[Number]
});

module.exports = mongoose.model('Graph',graphSchema);
