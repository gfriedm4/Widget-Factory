import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Admin extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<h1>Admin Panel</h1>
				</div>
				<div className="row">
					<div className="btn-group">
						<Link className="btn btn-success" to="/widgets/add">Add Widget</Link>
					</div>
				</div>
			</div>
		);
	}
}