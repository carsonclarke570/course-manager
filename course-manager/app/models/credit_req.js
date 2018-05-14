/**
 * CreditReq model
 *
 * @file 	credit_req.js
 * @author	Carson Clarke-Magrab
 * @since	1.0.0
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CreditReqSchema = new Schema({
	name: String,
	creditreq: Number,
	credittaken: Number
});

module.exports = mongoose.model('CreditReq', CreditReqSchema);