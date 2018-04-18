import React, { Component } from 'react';
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';

class WidgetForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: {
				name: "",
				type: "",
				size: "",
				finish: "",
				inventory: "",
				price: ""
			},
			types: null,
			sizes: null,
			finishes: null,
			widgetSuccess: false,
			errors: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// Get values for each dropdown from server
		axios.all([
			axios.get('/api/types'),
			axios.get('/api/sizes'),
			axios.get('/api/finishes')
		])
			.then(axios.spread((types, sizes, finishes) => {

				const { type, size, finish } = this.props;

				const fields = {
					...this.state.fields,
					// Take from prop or the first item in array
					type: type || Object.keys(types.data)[0],
					size: size || Object.keys(sizes.data)[0],
					finish: finish || Object.keys(finishes.data)[0],
				};

				console.log(fields);
				this.setState({
					types: types.data,
					sizes: sizes.data,
					finishes: finishes.data,
					fields: fields
				});
			}));
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { fields } = this.state;

		fields[name] = value;

		this.setState({
			fields: fields,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const { fields } = this.state;
		axios.post('/api/widgets', {
			name: fields.name,
			widget_type_id: fields.type,
			widget_size_id: fields.size,
			widget_finish_id: fields.finish,
			inventory: fields.inventory,
			price: fields.price * 100
		})
			.then(response => {
				this.setState({
					widgetSuccess: true
				})
			})
			.catch(error => {
				this.setState({
					errors: error.response
				})
			});
	}

	render() {
		const { types, sizes, finishes, fields, widgetSuccess } = this.state;
		if (!types && !sizes && !finishes) {
			return (
				<div className="spinner">
					<PacmanLoader />
				</div>
			);
		}

		if (widgetSuccess) {
			return (
				<Redirect to={{
					pathname: '/widgets',
					state: { widgetSuccess: true }
				}}/>
			)
		}

		return <div className="container">
			<h2>Create a Widget</h2>
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
						<label htmlFor="type">Type</label>
						<select
							onChange={this.handleChange}
							name="type"
							id="type"
							value={fields.type}
							className="form-control"
							required
						>
							{
								Object.keys(types).map(key => (
									<option key={key} value={key}>{types[key]}</option>
								))
							}
						</select>
					</div>
				</div>
				<div className="form-row justify-content-center">
					<div className="form-group col-md-6">
						<label htmlFor="size">Type</label>
						<select
							onChange={this.handleChange}
							name="size"
							id="size"
							value={fields.size}
							className="form-control"
							required
						>
							{
								Object.keys(sizes).map(key => (
									<option key={key} value={key}>{sizes[key]}</option>
								))
							}
						</select>
					</div>
				</div>
				<div className="form-row justify-content-center">
					<div className="form-group col-md-6">
						<label htmlFor="finish">Type</label>
						<select
							onChange={this.handleChange}
							name="finish"
							id="finish"
							value={fields.finish}
							className="form-control"
							required
						>
							{
								Object.keys(finishes).map(key => (
									<option key={key} value={key}>{finishes[key]}</option>
								))
							}
						</select>
					</div>
				</div>
				<div className="form-row justify-content-center">
					<div className="form-group col-md-6">
						<label htmlFor="inventory">Inventory</label>
						<input
							type="number"
							onChange={this.handleChange}
							name="inventory"
							id="inventory"
							value={fields.inventory}
							className="form-control"
							required
						/>
					</div>
				</div>
				<div className="form-row justify-content-center">
					<div className="form-group col-md-6">
						<label htmlFor="price">Price</label>
						<input
							type="number"
							onChange={this.handleChange}
							name="price"
							id="price"
							value={fields.price}
							className="form-control"
							required
						/>
					</div>
				</div>
				<div className="form-row justify-content-center">
					<div className="form-group col-md-6">
						<input className="btn btn-success" type="submit" value="Submit" />
					</div>
				</div>
			</form>
		</div>
	}
}

export default WidgetForm;