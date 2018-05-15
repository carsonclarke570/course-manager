import React from 'react';
import axios from 'axios';

class Tasks extends React.Component {
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
						<a class="nav-link" href="#">Sign Out</a>
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
							<a class="nav-link active" href="/tasks">
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
							<a class="nav-link" href="/courses">
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
				<div class="row">
					<div class="col">
						<div class="row mr-1">
							<div class="col d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
								<h1 class="h2">Upcoming</h1>
							</div>
						</div>
						<div class="row mr-1">
							<div class="col d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
								<h1 class="h2">Important</h1>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 class="h2">Tasks</h1>
						</div>
						<TaskList/>
						<AddTaskButton/>
					</div>
				</div>
			</main>
		);
	}
}

class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: {}
		};
	}
	
	componentDidMount() {
		axios.get('api/tasks').then(res => {
			this.setState({ tasks: res.data });
			console.log(this.state.tasks);
		});
	}
	
	render() {
		function convertDate(date) {
			var data = new Date(date);
			return (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear();
		}
		
		function convertPriority(priority) {
			if (priority === 0) {
				return 'High';
			} else if (priority === 1) {
				return 'Medium';
			} else {
				return 'Low';
			}
		}
		
		function getColor(priority) {
			if (priority === 0) {
				return 'text-danger';
			} else if (priority === 1) {
				return 'text-warning';
			} else {
				return 'text-success';
			}
		}
		
		if (this.state.tasks.length !== 0) {
			return (
				<div class="container">
					<table class="table">
						<thead class="thead-dark">
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Priority</th>
								<th scope="col">Due</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{ Object.values(this.state.tasks).map(function(s) {
								return (
									<tr>
										<th scope="row">{ s.title }</th>
										<td class={ getColor(s.priority) }>{ convertPriority(s.priority) }</td>
										<td>{ convertDate(s.due) }</td>
										<td align="right">
											<button type="button" class="btn btn-outline-info btn-sm mr-2">Info</button>
											<button type="button" class="btn btn-outline-primary btn-sm">Done</button>	
										</td>
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

class AddTaskButton extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: 'No description.',
			due: '',
			priority: 2
		};
	}
	
	onChange = (e) => {
		const state = this.state;
		if(e.target.name === 'priority') {
			if (e.target.value === 'high') {
				state[e.target.name] = 0;
			} else if (e.target.value === 'medium') {
				state[e.target.name] = 1;
			} else {
				state[e.target.name] = 2;
			}
		} else {
			state[e.target.name] = e.target.value;
		}
		this.setState(state);
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		
		const { title, description, due, priority } = this.state;
		axios.post('/api/tasks', { title, description, due, priority });
		window.location.reload();
	}
	
	render() {
		const { title, description, due, priority } = this.state;
		
		return (
			<div class="ml-3">
				<button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#addCourse">
					Add Task
				</button>

				<div class="modal fade" id="addCourse" tabIndex="-1" role="dialog">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<form onSubmit={this.onSubmit}>
								<div class="modal-header">
									<h5 class="modal-title">Add Task</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div class="form-group">
										<label for="title">Task Title</label>
										<input name="title" value={title} onChange={this.onChange} type="text" class="form-control" id="title" placeholder="Title" required></input>
									</div>
									<div class="form-group">
										<label for="description">Description</label>
										<textarea name="description" value={description} onChange={this.onChange} class="form-control" id="description" placeholder="Description" rows="3"></textarea>
									</div>
									<div class="form-group">
										<label for="due">Deadline</label>
										<input name="due" value={due} onChange={this.onChange} type="date" class="form-control" id="due" required></input>
									</div>
									<div class="form-group">
										<label for="priority">Priority</label>
										<select mutiple="true" class="form-control" name="priority" value={priority} onChange={this.onChange} id="priority" required>
											<option>Low</option>
											<option>Medium</option>
											<option>High</option>
										</select>
									</div>
								</div>
								<div class="modal-footer">
									<button type="submit" class="btn btn-outline-primary">Add Task</button>
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

export default Tasks;