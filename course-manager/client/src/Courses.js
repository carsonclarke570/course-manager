import React from 'react';
import axios from 'axios';

class Courses extends React.Component {
	render() {
		return (
			<div>
				<NavBar/>
				<div class="container-fluid">
					<div class="row">
						<SideBar/>
						<Main/>
					</div>
				</div>
			</div>
		);
	}
}

class NavBar extends React.Component {
	
	render() {
		return (
			<nav class="navbar fixed-top navbar-dark bg-dark flex-md-nowrap p-0 shadow">
				<a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Course Manager</a>
				<ul class="navbar-nav px-3">
					<li class="nav-item text-nowrap">
						<a class="nav-link" href="#">Sign out</a>
					</li>
				</ul>
			</nav>
		);
	}
}

class SideBar extends React.Component {
	
	render() {
		return (
			<nav class="col-md-2 d-none d-md-block bg-light sidebar">
				<div class="sidebar-sticky">
					<ul class="nav flex-column">
						<li class="nav-item">
							<a class="nav-link" href="/">
								<span class="oi oi-browser mr-2" title="dashboard" aria-hidden="true"></span>
								Dashboard
							</a>
						</li>
					</ul>
					<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
						<span>Task Manager</span>
						<a class="d-flex align-items-center text-muted" href="#"></a>
					</h6>
					<ul class="nav flex-column">
						<li class="nav-item">
							<a class="nav-link" href="/tasks">
								<span class="oi oi-list mr-2" title="list" aria-hidden="true"></span>
								Tasks
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/courses">
								<span class="oi oi-pencil mr-2" title="pencil" aria-hidden="true"></span>
								Projects
							</a>
						</li>
					</ul>
					<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
						<span>Course Manager</span>
						<a class="d-flex align-items-center text-muted" href="#"></a>
					</h6>
					<ul class="nav flex-column">
						<li class="nav-item">
							<a class="nav-link active" href="/courses">
								<span class="oi oi-spreadsheet mr-2" title="spreadsheet" aria-hidden="true"></span>
								Courses
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/courses">
								<span class="oi oi-clock mr-2" title="clock" aria-hidden="true"></span>
								Semesters
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

class Main extends React.Component {
	
	render() {
		return (
			<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mb-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 class="h2">Credit Requirements</h1>
				</div>
				<CredReqList/>
				<AddCreditReqButton/>
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 class="h2">Courses</h1>
				</div>
				<CourseList/>
				<AddCourseButton/>
			</main>
		);
	}
}


class CredReqList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cred_reqs: {}
		};
	}
	
	componentDidMount() {
		axios.get('api/creditreqs').then(res => {
			this.setState({ cred_reqs: res.data });
			console.log(this.state.cred_reqs);
		});
	}
	
	render() {
		function deleteReq(id) {
			axios.delete('api/creditreqs/' + id);
			window.location.reload();
		}
		
		if (this.state.cred_reqs.length !== 0) {
			return (
				<div class="container">
					<table class="table table-hover">
						<thead class="thead-dark">
							<tr>
								<th scope="col">Credit Requirement</th>
								<th scope="col">Credits Required</th>
								<th scope="col">Credits Taken</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{ Object.values(this.state.cred_reqs).map(function(s) {
								return (
									<tr>
										<th scope="row">{ s.name }</th>
										<td>{ s.creditreq }</td>
										<td>{ s.credittaken }</td>
										<td><button type="button" class="btn btn-outline-danger btn-sm" onClick={deleteReq.bind(this, s._id)}>Delete</button></td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			);
		} else {
			return ( 
				<div>
					<h5 class="text-center">Empty! Add a new category.</h5>
				</div>
			);
		}
	}
}

class CourseList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: {}
		};
	}
	
	componentDidMount() {
		axios.get('api/courses').then(res => {
			this.setState({ courses: res.data });
			console.log(this.state.courses);
		});
	}
	
	render() {
		function deleteCourse(id) {
			axios.delete('api/courses/' + id);
			window.location.reload();
		}
		
		if (this.state.courses.length !== 0) {
			return (
				<div class="container">
					<table class="table table-hover">
						<thead class="thead-dark">
							<tr>
								<th scope="col">Course Code</th>
								<th scope="col">Course Name</th>
								<th scope="col">Credits</th>
								<th scope="col">Taken</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{ Object.values(this.state.courses).map(function(s) {
								return (
									<tr>
										<th scope="row">{ s.code }</th>
										<td>{ s.name }</td>
										<td>{ s.credits }</td>
										<td>{ s.taken }</td>
										<td><button type="button" class="btn btn-outline-danger btn-sm" onClick={deleteCourse.bind(this, s._id)}>Delete</button></td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			);
		} else {
			return ( 
				<div>
					<h5 class="text-center">Empty! Add a new course.</h5>
				</div>
			);
		}
	}
}

class AddCreditReqButton extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			creditreq: 0,
			credittaken: 0
		};
	}
	
	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		
		const { name, creditreq, credittaken } = this.state;
		axios.post('/api/creditreqs', { name, creditreq, credittaken });
		window.location.reload();
	}
	
	render() {
		const { name, creditreq, credittaken } = this.state;
		
		return (
			<div class="ml-3">
				<button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
					Add Credit Requirement
				</button>

				<div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<form onSubmit={this.onSubmit}>
								<div class="modal-header">
									<h5 class="modal-title">Add Credit Requirement</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div class="form-group">
										<label for="name">Credit Requirement Name</label>
										<input name="name" value={name} onChange={this.onChange} type="text" class="form-control" id="name" placeholder="University Physics II" required></input>
									</div>
								</div>
								<div class="modal-footer">
									<button type="submit" class="btn btn-outline-primary">Add Requirement</button>
									<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}	

class AddCourseButton extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			code: '',
			credits: '',
			taken: 'Yes'
		};
	}
	
	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		
		const { name, code, credits, taken } = this.state;
		axios.post('/api/courses', { name, code, credits, taken });
		window.location.reload();
	}
	
	render() {
		const { name, code, credits, taken } = this.state;
		
		return (
			<div class="ml-3">
				<button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#addCourse">
					Add Course
				</button>

				<div class="modal fade" id="addCourse" tabIndex="-1" role="dialog">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<form onSubmit={this.onSubmit}>
								<div class="modal-header">
									<h5 class="modal-title">Add Course</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div class="form-group">
										<label for="name">Course Name</label>
										<input name="name" value={name} onChange={this.onChange} type="text" class="form-control" id="name" placeholder="University Physics II" required></input>
									</div>
									<div class="form-group">
										<label for="code">Course Code</label>
										<input name="code" value={code} onChange={this.onChange} type="text" class="form-control" id="code" placeholder="PHYS 212" required></input>
									</div>
									<div class="form-group">
										<label for="credits">Credits</label>
										<input name="credits" value={credits} onChange={this.onChange} type="text" class="form-control" id="credits" placeholder="4" required></input>
									</div>
									<div class="form-group">
										<label for="taken">Taken</label>
										<select mutiple="true" class="form-control" name="taken" value={taken} onChange={this.onChange} id="taken" required>
											<option>Yes</option>
											<option>No</option>
										</select>
									</div>
								</div>
								<div class="modal-footer">
									<button type="submit" class="btn btn-outline-primary">Add Course</button>
									<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}	

export default Courses;