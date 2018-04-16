import React from 'react';

const Widget = ({ name, type, finish, size, price, inventory, ...props }) => (
	<div {...props}>
		<div>{name}</div>
		<div>{type}</div>
		<div>{finish}</div>
		<div>{size}</div>
		<div>{price}</div>
		<div>{inventory}</div>
	</div>
);

export default Widget;