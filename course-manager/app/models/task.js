var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	title: String,
	description: String,
	due: Date,
	priority: Number
});

module.exports = mongoose.model('Task', TaskSchema);