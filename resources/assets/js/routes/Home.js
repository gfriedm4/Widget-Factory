import React, { Component } from 'react';

export default class Home extends Component {
	render() {
		return (
			<div className="welcome jumbotron">
				<h1 className="display-4">Hello Widget Wizards!</h1>
				<p className="lead">Welcome to the Widget Factory Store, where you can satisfy all of your widget buying needs!</p>
				<hr className="my-4"/>
				<p>Please enjoy, but don't spend all your money in one place!</p>
			</div>
		);
	}
}