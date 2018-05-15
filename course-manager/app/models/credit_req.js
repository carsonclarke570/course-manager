var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CreditReqSchema = new Schema({
	name: String,
	creditreq: Number,
	credittaken: Number
});

module.exports = mongoose.model('CreditReq', CreditReqSchema);