import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class OrderForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: {
				name: this.props.name || "",
				email: this.props.email || "",
				address: this.props.address || "",
				widgets: this.props.widgets || {}
			},
			error: false,
			orderSuccess: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { fields } = this.state;

		fields[name] = value;

		this.setState({
			fields: fields,
		});
	}

	handleQuantityChange(event) {
		const id = event.target.dataset.id;
		let { widgets } = this.state.fields;
		widgets[id].quantity = event.target.value;

		this.setState({
			fields: {
				...this.state.fields,
				widgets: widgets
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault();

		const { fields } = this.state;
		let widgets = JSON.parse(JSON.stringify(fields.widgets));
		for (let key in widgets) {
			delete widgets[key]['value'];
			delete widgets[key]['label'];
			delete widgets[key]['inventory'];
			widgets[key]['quantity'] = parseInt(widgets[key]['quantity']);
		}

		axios.post('/api/orders', {
			name: fields.name,
			email: fields.email,
			address: fields.address,
			widgets: widgets
		})
			.then(response => {
				this.setState({
					error: false,
					orderSuccess: true
				})
			})
			.catch(error => {
				const response = JSON.parse(error.response.request.response);
				console.log(response);
				this.setState({
					errors: response
				});
			});
	}

	render() {
		const { fields, errors, orderSuccess } = this.state;

		if (orderSuccess) {
			return (
				<Redirect to={{
					pathname: '/orders',
					state: { orderSuccess: true }
				}}/>
			)
		}

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div className="form-row justify-content-center">
						<div className="form-group col-md-6">
							<h2>Create an Order</h2>
						</div>
					</div>
					<div className="form-row justify-content-center">
						<div className="form-group col-md-6">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								onChange={this.handleChange}
								name="name"
								id="name"
								value={fields.name}
								className="form-control"
								required
							/>
							{
								errors &&
								errors.name &&
								<span className="text-danger">{errors.name[0]}</span>
							}
						</div>
					</div>
					<div className="form-row justify-content-center">
						<div className="form-group col-md-6">
							<label htmlFor="email">Email Address</label>
							<input
								type="email"
								onChange={this.handleChange}
								name="email"
								id="email"
								value={fields.email}
								className="form-control"
								required
							/>
							{
								errors &&
								errors.email &&
								<span className="text-danger">{errors.email[0]}</span>
							}
						</div>
					</div>
					<div className="form-row justify-content-center">
						<div className="form-group col-md-6">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								onChange={this.handleChange}
								name="address"
								id="address"
								value={fields.address}
								className="form-control"
								required
							/>
							{
								errors &&
								errors.address &&
								<span className="text-danger">{errors.address[0]}</span>
							}
						</div>
					</div>
					<div className="form-row justify-content-center">
						<div className="form-group col-md-6">
							<label htmlFor="widgets">Widgets</label>
							{
								Object.keys(fields.widgets).map(widgetId => {
									const widget = fields.widgets[widgetId];
									return (
										<div className="row" key={widget.value}>
											<div className="col-md-8">
												<div className="row">
													<strong className="col-md-2">Name</strong>
													<span className="col-md-10">{widget.label}</span>
												</div>
											</div>
											<div className="col-md-4">
												<div className="row">
													<strong className="col-md-8">Quantity</strong>
													<input
														name="quantity"
														className="col-md-4"
														data-id={widget.value}
														type="number"
														min={1}
														max={widget.inventory}
														value={widget.quantity}
														onChange={this.handleQuantityChange}
														className="form-control"
														required
													/>
												</div>
											</div>
										</div>
									);
								})
							}
							{
								errors &&
								errors.widgets &&
								<span className="text-danger">{errors.widgets[0]}</span>
							}
							{
								errors &&
								errors.errors &&
								errors.errors.widgets &&
								<span className="text-danger">{errors.errors.widgets}</span>
							}
						</div>
					</div>
					<div className="form-row justify-content-center">
						<div className="form-group col-md-6">
							<input
								className="btn btn-success"
								type="submit"
								value="Submit"
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default OrderForm;