import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Courses from './Courses'
import Tasks from './Tasks'

ReactDOM.render(
	<Router>
		<div>
			<Route exact path='/' component={HomePage} />
			<Route path='/courses' component={Courses} />	
			<Route path='/tasks' component={Tasks} />
		</div>
	</Router>,
	document.getElementById('root')
);