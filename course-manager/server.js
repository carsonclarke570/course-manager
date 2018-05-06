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

// Routes
var router = express.Router();              

router.use(function(req, res, next) {
	console.log('Something is happening');
	next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
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
	});

// Register Routes
app.use('/api', router);

// Start Server
app.listen(port);
console.log('Magic happens on port ' + port);
