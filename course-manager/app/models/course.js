var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
	name: String,
	code: String,
	credits: Number,
	taken: String
});

module.exports = mongoose.model('Course', CourseSchema);