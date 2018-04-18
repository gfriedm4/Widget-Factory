import React, { Component } from 'react';

import ResourceTable from '../components/ResourceTable';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";
import { PacmanLoader } from 'react-spinners';

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
			return (
				<div className="spinner">
					<PacmanLoader />
				</div>
			);
		}

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
			headerClasses: 'small-column',
			hidden: true
		},
		{
			dataField: 'price',
			text: 'Price',
			sort: true,
			headerClasses: 'small-column'
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
					price: "$" + (widget.price  / 100).toFixed(2)
				}
			));
		};

		const selectRow = {
			mode: 'checkbox',
			clickToSelect: true,
			bgColor: '#6C6EA0',
			style: { color: '#FFFFFF' },
			selected: this.state.selectedRows,
			onSelect: (row, isSelect, rowIndex) => {
				const { selectedItems } = this.state;
				let selectedRows;
				if (isSelect) {
					selectedItems[row.id] = {
						value: row.id,
						label: row.name,
						quantity: 1,
						inventory: row.inventory
					};
					selectedRows = [...this.state.selectedRows, row.id];
				}
				else {
					delete selectedItems[row.id];
					selectedRows = this.state.selectedRows.filter(x => x !== row.id);
				}

				this.setState({
					selectedItems: selectedItems,
					selectedRows: selectedRows
				});
			}
		};

		const { state } = this.props.location;

		return (
			<div>
				{ state && state.widgetSuccess &&
					<div className="alert alert-success alert-dismissible">
						<span>Successfully created widget!</span>
					</div>
				}
				<ResourceTable
					api={'/api/widgets'}
					columns={columns}
					resourceFormatter={resourceFormatter}
					selectable
					linkTo="/orders/add"
					tableType="widget"
					noDataIndication="No Widgets Found"

				/>
			</div>
		);
	}
}