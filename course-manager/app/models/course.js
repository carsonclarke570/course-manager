/**
 * Course model
 *
 * @file 	course.js
 * @author	Carson Clarke-Magrab
 * @since	1.0.0
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
	name: String,
	code: String,
	credits: Number,
	taken: Boolean
});

module.exports = mongoose.model('Course', CourseSchema);