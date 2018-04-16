import React, { Component } from 'react';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ReactModal from 'react-modal';
import WidgetForm from "../forms/WidgetForm";
import OrderForm from "../forms/OrderForm";

ReactModal.setAppElement('#root');

export default class ResourceTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			resources: null,
			page: null,
			perPage: null,
			total: null,
			nextPageUrl: null,
			prevPageUrl: null,
			firstPageUrl: null,
			lastPageUrl: null,
			lastPage: null,
			path: null,
			selectedItems: {},
			selectedRows: [],
			showModal: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	componentDidMount() {
		this.getResources(this.props.api);
	}

	handleOpenModal () {
		this.setState({ showModal: true });
	}

	handleCloseModal () {
		this.setState({ showModal: false });
	}

	getResources(url) {
		axios
			.get(url)
			.then(response => {
				const { data } = response;
				let resources = data.data;
				if (this.props.resourceFormatter) {
					resources = this.props.resourceFormatter(resources);
				}

				this.setState({
					resources: resources,
					page: data.current_page,
					perPage: data.per_page,
					total: data.total,
					nextPageUrl: data.next_page_url,
					prevPageUrl: data.prev_page_url,
					firstPageUrl: data.first_page_url,
					lastPageUrl: data.last_page_url,
					lastPage: data.last_page,
					path: data.path
				});
			})
			.catch(error => {
				console.log(error.response);
			});
	}

	render() {
		let { resources } = this.state;

		const { tableType } = this.props;

		if (!resources || resources.length === null) {
			return <RingLoader />
		}

		const selectRow = {
			mode: 'checkbox',
			clickToSelect: true,
			bgColor: 'whitesmoke',
			selected: this.state.selectedRows,
			onSelect: (row, isSelect, rowIndex) => {
				const { selectedItems } = this.state;
				let selectedRows;
				if (isSelect) {
					selectedItems[row.id] = {
						value: row.id,
						label: row.name,
						quantity: 1
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

		let { columns } = this.props;

		const onTableChange = (type, newState) => {
			let path = this.state.path + "?page=" + newState.page;

			if (newState.sortField && newState.sortOrder) {
				path += "&sort=" + newState.sortField +
					"&order=" + newState.sortOrder;
			}

			const { filters } = newState;

			if (Object.keys(filters).length) {
				for (let filter of Object.keys(filters)) {
					path += "&" + filter + "=" + filters[filter].filterVal;
				}
			}
			this.getResources(path);
		};

		return (
			<div className="container">
				<div className="row">
					<div className="btn-group">
						{
							tableType == 'widget' &&
							<button
								className="fa fa-plus"
								onClick={this.handleOpenModal}
							>
								Add to order
							</button>
						}

					</div>
				</div>
				<div className="row">
					<BootstrapTable
						classes="resource-table"
						keyField='id'
						data={resources}
						columns={columns}
						hover
						remote={{
							pagination: true,
							sort: true,
							filter: true
						}}
						onTableChange={onTableChange}
						pagination={paginationFactory({
							page: this.state.page,
							sizePerPage: this.state.perPage,
							totalSize: this.state.total,
							hideSizePerPage: true
						})}
						selectRow={this.props.selectable && selectRow}
						filter={filterFactory()}
					/>
					<ReactModal
						isOpen={this.state.showModal}
						contentLabel="Form"
					>
						<button onClick={this.handleCloseModal}>Close</button>
						{ tableType === 'widget' &&
							<OrderForm
								widgets={this.state.selectedItems}
							/>
						}
					</ReactModal>
				</div>
			</div>
		);
	}
}
