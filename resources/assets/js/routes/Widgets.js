import React, { Component } from 'react';

import ResourceTable from '../components/ResourceTable';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";
import { RingLoader } from 'react-spinners';

export default class Widgets extends Component {
	constructor(props) {
		super(props);

		this.state = {
			types: null,
			sizes: null,
			finishes: null
		}
	}

	componentDidMount() {
		// Get values for each dropdown from server
		axios.all([
			axios.get('/api/types'),
			axios.get('/api/sizes'),
			axios.get('/api/finishes')
		])
			.then(axios.spread((types, sizes, finishes) => {
				this.setState({
					types: types.data,
					sizes: sizes.data,
					finishes: finishes.data,
				});
			}));
	}

	render() {
		const { finishes, types, sizes } = this.state;
		if (finishes === null || types === null || sizes === null) {
			return <RingLoader/>;
		}
		console.log(finishes);
		const columns = [{
			dataField: 'id',
			text: 'ID',
			hidden: true
		}, {
			dataField: 'name',
			text: 'Name',
			sort: true,
			filter: textFilter()
		}, {
			dataField: 'widgetType',
			text: 'Type',
			filter: selectFilter({
				options: types
			})
		}, {
			dataField: 'widgetSize',
			text: 'Size',
			filter: selectFilter({
				options: sizes
			})
		}, {
			dataField: 'widgetFinish',
			text: 'Finish',
			filter: selectFilter({
				options: finishes
			})
		},
		{
			dataField: 'inventory',
			text: 'Inventory',
		},
		{
			dataField: 'price',
			text: 'Price',
			sort: true,
		}];

		const resourceFormatter = (widgets) => {
			return widgets.map(widget => (
				{
					id: widget.id,
					name: widget.name,
					widgetType: widget.widget_type.type,
					widgetSize: widget.widget_size.size,
					widgetFinish: widget.widget_finish.finish,
					inventory: widget.inventory,
					price: widget.price
				}
			));
		};

		return (
			<ResourceTable
				api={'/api/widgets'}
				columns={columns}
				resourceFormatter={resourceFormatter}
				selectable
				linkTo="/orders/add"
				tableType="widget"
			/>
		);
	}
}