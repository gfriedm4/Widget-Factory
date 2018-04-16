import React, { Component } from 'react';
import ReactModal from 'react-modal';
import WidgetForm from "../forms/WidgetForm";

ReactModal.setAppElement('#root');

export default class Admin extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showModal: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal () {
		this.setState({ showModal: true });
	}

	handleCloseModal () {
		this.setState({ showModal: false });
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<h1>Admin Panel</h1>
				</div>
				<div className="row">
					<div className="btn-group">
						<button
							className="btn btn-success"
							onClick={this.handleOpenModal}
						>
							<span className="fa fa-plus">Add Widget</span>
						</button>
					</div>
				</div>
				<ReactModal
					isOpen={this.state.showModal}
					contentLabel="Add a Widget"
				>
					<button onClick={this.handleCloseModal}>Close</button>
					<WidgetForm />
				</ReactModal>
			</div>
		);
	}
}