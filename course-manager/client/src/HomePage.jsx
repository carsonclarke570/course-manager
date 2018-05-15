import React from 'react';

class HomePage extends React.Component {
	render() {
		return (
			<div>
				<NavBar/>
				<div class="container-fluid">
					<div class="row">
						<SideBar/>
						<div></div>
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
							<a class="nav-link active" href="/">
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

export default HomePage;