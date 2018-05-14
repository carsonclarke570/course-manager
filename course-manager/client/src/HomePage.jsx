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
								Dashboard
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/courses">
								Courses
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default HomePage;