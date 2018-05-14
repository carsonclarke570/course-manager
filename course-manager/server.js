/**
 * Server JavaScript code.
 *
 * @file 	server.js
 * @author	Carson Clarke-Magrab
 * @since	1.0.0
 */

// Set-up
var mongoose = require('mongoose');
mongoose.connect('mongodb://course-manager-admin:07090Web!@ds215910.mlab.com:15910/course-manager-database')

var express = require('express');       
var app = express();              
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;       

var Course = require('./app/models/course');
var CreditReq = require('./app/models/credit_req');

// Routes
var router = express.Router();              

router.use(function(req, res, next) {
	console.log('Something is happening');
	next();
});

router.route('/courses')
	.post(function(req, res) {
		var course = new Course();
		course.name = req.body.name;
		course.code = req.body.code;
		course.credits = req.body.credits;
		course.taken = req.body.taken;
		course.save(function(err) {
			if (err)
				res.send(err);
			
			res.json({ message: 'Course created:' + course.name + '-' + course.code });
		});
	})
	.get(function(req, res) {
		Course.find(function(err, courses) {
			if (err)
				res.send(err);
			
			res.json(courses);
		});
	});
	
router.route('/courses/:course_id')
	.get(function(req, res) {
		Course.findById(req.params.course_id, function(err, course) {
			if (err)
				res.send(err);
			res.json(course);
		});
	})
	.put(function(req, res) {
		Course.findById(req.params.course_id, function(err, course) {
			if (err)
				res.send(err);
			course.name = req.body.name;
			course.code = req.body.code;
			course.credits = req.body.credits;
			course.taken = req.body.taken;
			bear.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Course updated!' });
			});
		});
	})
	.delete(function(req, res) {
		Course.remove({
			_id: req.params.course_id
		}, function(err, course) {
			if (err)
				res.send(err);
			res.json({ message: 'Sucessfully deleted' });
		});
	});
	
router.route('/creditreqs')
	.post(function(req, res) {
		var credreq = new CreditReq();
		credreq.name = req.body.name;
		credreq.creditreq = req.body.creditreq;
		credreq.credittaken = req.body.credittaken;
		credreq.save(function(err) {
			if (err)
				res.send(err);
			
			res.json({ message: 'Course created:' + credreq.name});
		});
	})
	.get(function(req, res) {
		CreditReq.find(function(err, credreq) {
			if (err)
				res.send(err);
			
			res.json(credreq);
		});
	});
	
router.route('/creditreqs/:credreq_id')
	.get(function(req, res) {
		CreditReq.findById(req.params.credreq_id, function(err, credreq) {
			if (err)
				res.send(err);
			res.json(credreq);
		});
	})
	.put(function(req, res) {
		CreditReq.findById(req.params.credreq_id, function(err, credreq) {
			if (err)
				res.send(err);
			credreq.name = req.body.name;
			credreq.creditreq = req.body.creditreq;
			credreq.credittaken = req.body.credittaken;
			credreq.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Course updated!' });
			});
		});
	})
	.delete(function(req, res) {
		CreditReq.remove({
			_id: req.params.credreq_id
		}, function(err, credreq) {
			if (err)
				res.send(err);
			res.json({ message: 'Sucessfully deleted' });
		});
	});

// Register Routes
app.use('/api', router);

// Start Server
app.listen(port);
console.log('Magic happens on port ' + port);
