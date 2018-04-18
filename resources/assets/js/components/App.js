import React from 'react';
import ReactDOM from 'react-dom';
import {
	Route,
	NavLink,
	Link,
	Switch,
	HashRouter
} from 'react-router-dom';

import Orders from '../routes/Orders';
import Order from './Order';
import Widgets from '../routes/Widgets';
import Widget from './Widget';
import Home from '../routes/Home';
import Admin from "../routes/Admin";

const App = () => (
	<HashRouter>
		<div className="container">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/">Widget Factory</Link>
				<button
					className="navbar-toggler"
	        type="button"
	        data-toggle="collapse"
	        data-target="#navbarSupportedContent"
	        aria-controls="navbarSupportedContent"
	        aria-expanded="false"
	        aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"/>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink activeClassName="active" className="nav-link" to="/orders">Orders</NavLink>
						</li>
						<li className="nav-item">
							<NavLink activeClassName="active" className="nav-link" to="/widgets">Widgets</NavLink>
						</li>
						<li className="nav-item">
							<NavLink activeClassName="active" className="nav-link" to="/admin">Admin</NavLink>
						</li>
					</ul>
				</div>
			</nav>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/orders" component={Orders} />
				<Route path="/admin" component={Admin} />
				<Route path="/widgets" component={Widgets} />
				<Route component={Orders} />
			</Switch>
		</div>
	</HashRouter>
);

export default App;

if (document.getElementById('root')) {
	ReactDOM.render(<App />, document.getElementById('root'));
}
