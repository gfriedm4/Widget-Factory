import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';

class Order extends Component {
	constructor(props) {
		super(props);

		this.state = {
			widgets: null,
			formActive: false,
			order: this.props.order,
			saved: false,
			deleted: false,
			error: false
		};

		this.handleEditSave = this.handleEditSave.bind(this);
		this.handleRemoveWidget = this.handleRemoveWidget.bind(this);
		this.handleAddWidget = this.handleAddWidget.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleWidgetChange = this.handleWidgetChange.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
	}

	componentDidMount() {
		axios.get('/api/widgets/all')
			.then(response => {
				let { data } = response;
				let widgets = [];

				for (let key in data) {
					widgets.push({
						value: key,
						label: data[key]
					});
				}

				this.setState({
					widgets: widgets
				})
			})
			.catch(error => {
				this.setState({
					widgets: null
				})
			})
	}

	handleInputChange(event) {
		let { order } = this.state;

		const { name } = event.target;

		order[name] = event.target.value;

		this.setState({
			order: order
		})
	}

	handleEditSave() {
		const { order } = this.state;

		if (!this.state.formActive) {
			this.setState({
				formActive: true
			});
		}
		else {
			// Pass only quantity along with id as key
			let widgets = order.widgets.reduce((obj, item) => {
				let id = item.id;
				item = {
					quantity: item.quantity
				};

				obj[id] = item;
				return obj;
			}, {});

			axios.put('/api/orders/' + order.id, {
				name: order.name,
				email: order.email,
				address: order.address,
				widgets: widgets
			})
				.then(response => {
					this.setState({
						saved: true,
						formActive: false,
						error: false
					})
				})
				.catch(error => {
					this.setState({
						saved: false,
						error: true
					})
				});
		}
	}

	handleQuantityChange(event) {
		let { order } = this.state;
		const { id } = event.target.dataset;

		order.widgets[id] = {
			id: order.widgets[id].id,
			quantity: event.target.value,
			name: order.widgets[id].name
		};

		this.setState({
			order
		});
	}

	handleWidgetChange(event) {
		let { order } = this.state;
		const { id } = event.target.dataset;

		order.widgets[id] = {
			id: event.target.value,
			quantity: 1,
			name: order.widgets[id].name
		};

		this.setState({
			order
		});
	}

	handleDeleteOrder(event) {
		let { order } = this.state;

		axios.delete('/api/orders/' + order.id)
			.then(response => {
				this.setState({
					deleted: true
				})
			})
			.catch(error => {
				const response = JSON.parse(error.response.request.response);
				this.setState({
					error: true,
					modal
				})
			});
	}

	handleRemoveWidget(event) {
		let { order } = this.state;
		delete order.widgets[event.target.dataset.id];

		this.setState({
			order
		});
	}

	handleAddWidget() {
		let { order } = this.state;

		order.widgets.push({
			id: this.state.widgets[0].value,
			name: this.state.widgets[0].label,
			quantity: 1
		});

		this.setState({
			order
		});
	}

	render() {
		const { formActive, order, saved, error, widgets, deleted } = this.state;

		if (widgets === null) {
			return (
				<div className="spinner">
					<PacmanLoader />
				</div>
			);
		}

		if (deleted) {
			return <Redirect to={{
				pathname: '/orders',
				state: { orderDelete: true }
			}}/>
		}

		return (
			<div className="container widget-order">
				{saved &&
					<div className="row justify-content-center">
						<div className="alert alert-success col-md-6">Saved Successfully</div>
					</div>
				}
				{error &&
					<div className="row justify-content-center">
						<div className="alert alert-danger col-md-6">There was an error with your submission.</div>
					</div>
				}
				<div className="row justify-content-center">
					<div className="col-md-6">
						<strong>Name:</strong>
						<span className={formActive ? 'd-none' : ''}>{order.name}</span>
						<input
							type="text"
							required
							className={!formActive ? 'd-none' : 'form-control'}
							name="name"
							value={order.name}
							onChange={this.handleInputChange}
						/>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-md-6">
						<strong>Email:</strong>
						<span className={formActive ? 'd-none' : ''}>{order.email}</span>
						<input
							type="email"
							required
							className={!formActive ? 'd-none' : 'form-control'}
							name="email"
							value={order.email}
							onChange={this.handleInputChange}
						/>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-md-6">
						<strong>Address:</strong>
						<span className={formActive ? 'd-none' : ''}>{order.address}</span>
						<input
							type="text"
							required
							className={!formActive ? 'd-none' : 'form-control'}
							name="address"
							value={order.address}
							onChange={this.handleInputChange}
						/>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-md-6">
						<strong>Widgets:</strong>
						{
							order.widgets.map((orderWidget, orderWidgetIndex) => (
								<div key={orderWidget.id + orderWidgetIndex} className="row mb-1">
									<div className="col">
										<span className={formActive ? 'd-none' : 'col'}>{orderWidget.name}</span>
										<select
											className={!formActive ? 'd-none' : 'col form-control'}
											data-id={orderWidgetIndex}
											onChange={this.handleWidgetChange}
											value={orderWidget.id}
										>
											{
												widgets.map((widget, index) => (
													<option key={index} value={widget.value}>{widget.label}</option>
												))
											}
										</select>
									</div>
									<div className="col">
										<span className={formActive ? 'd-none' : 'col'}>{orderWidget.quantity}</span>
										<input
											className={!formActive ? 'd-none' : 'col form-control'}
											name="quantity"
											type="number"
											min={0}
											max={orderWidget.inventory}
											value={orderWidget.quantity}
											data-id={orderWidgetIndex}
											onChange={this.handleQuantityChange}
										/>
									</div>
									<div className="col">
										<button
											onClick={this.handleRemoveWidget}
											data-id={orderWidgetIndex}
											className={!formActive ? 'd-none' : 'col btn btn-danger'}
										>
											<span className="fa fa-remove" />
											<span>Remove</span>
										</button>
									</div>
								</div>
							))
						}
						<button
							onClick={this.handleAddWidget}
							className={!formActive ? 'd-none' : 'btn btn-success'}
						>
							<span className="fa fa-add"/>Add Widget
						</button>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-md-6 text-right">
						<div className="btn-group">
							<button
								onClick={this.handleDeleteOrder}
								className="btn btn-danger"
							>
								<span className="fa fa-remove"/>Delete
							</button>
							<button
								onClick={this.handleEditSave}
								className="btn btn-success"
							>
								{formActive ? <span><span className="fa fa-save"/>Save</span> : <span><span className="fa fa-edit"/>Edit</span>}
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Order;