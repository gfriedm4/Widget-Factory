import React, { Component } from 'react';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import Select from 'react-select';

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
			widgets[key]['quantity'] = parseInt(widgets[key]['quantity']);
		}

		axios.post('/api/orders', {
			name: fields.name,
			email: fields.email,
			address: fields.address,
			widgets: widgets
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error.response);
			});
	}

	render() {
		const { fields } = this.state;

		return <div className="container">
			<h2>Create an Order</h2>
			<form onSubmit={this.handleSubmit}>
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
													value={widget.quantity}
													onChange={this.handleQuantityChange}
												/>
											</div>
										</div>
									</div>
								);
							})
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
	}
}

export default OrderForm;