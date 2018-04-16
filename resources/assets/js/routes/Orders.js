import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { textFilter } from 'react-bootstrap-table2-filter';


import ResourceTable from '../components/ResourceTable';

export default class Orders extends Component {

	render() {
		const columns = [{
			dataField: 'id',
			text: 'ID',
			hidden: true
		}, {
			dataField: 'updated_at',
			text: 'Order Date',
			sort: true,
		}, {
			dataField: 'name',
			text: 'Name',
			sort: true,
			filter: textFilter({
				placeholder: 'Name'
			})
		}, {
			dataField: 'email',
			text: 'Email',
			filter: textFilter({
				placeholder: 'Email'
			})
		}, {
			dataField: 'address',
			text: 'Address',
			filter: textFilter({
				placeholder: 'Address'
			})
		}];

		return (
			<ResourceTable
				api={'/api/orders'}
				columns={columns}
				tableType="order"
			/>
		);
	}
}