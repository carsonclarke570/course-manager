import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Courses from './Courses'

ReactDOM.render(
	<Router>
		<div>
			<Route exact path='/' component={HomePage} />
			<Route path='/courses' component={Courses} />	
		</div>
	</Router>,
	document.getElementById('root')
);