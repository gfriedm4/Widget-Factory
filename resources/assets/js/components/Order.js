import React from 'react';

const Order = ({ name, email, address, ...props }) =>  (
	<div {...props}>
		<div>{name}</div>
		<div>{email}</div>
		<div>{address}</div>
	</div>
);

export default Order;