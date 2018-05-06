import React from 'react';
import axios from 'axios';

class Courses extends React.Component {
	render() {
		return (
			<div>
				<NavBar/>
				<div class="container">
					<CourseList/>
					<ModalAddButton/>
				</div>
			</div>
		);
	}
}

class NavBar extends React.Component {
	
	render() {
		return (
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
				<a class="navbar-brand" href="/">Course Manager</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item active">
							<a class="nav-link" href="/">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/courses">Courses<span class="sr-only">(current)</span></a>
						</li>
					</ul>
				</div>
			</nav>
		);
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
		return (
			<div class="container mt-4">
				<table class="table table-hover">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Course Code</th>
							<th scope="col">Course Name</th>
							<th scope="col">Credits</th>
							<th scope="col">Taken</th>
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
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

class ModalAddButton extends React.Component {
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
				<button type="button" class="btn btn-default" data-toggle="modal" data-target="#exampleModal">
					Add Course
				</button>

				<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
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
										<select mutiple class="form-control" name="taken" value={taken} onChange={this.onChange} id="taken" required>
											<option>Yes</option>
											<option>No</option>
										</select>
									</div>
								</div>
								<div class="modal-footer">
									<button type="submit" class="btn btn-primary">Add Course</button>
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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