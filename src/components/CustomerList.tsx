import React from 'react';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  address: {
    city: string;
  };
  birthDate: string;
}

interface CustomerListProps {
  customers: Customer[];
  highlightOldest: boolean;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, highlightOldest }) => {
	const getOldestPerCity = (customers: Customer[]) => {
		const oldestPerCity: { [city: string]: Customer } = {};

		customers.forEach(customer => {
			if (!oldestPerCity[customer.address.city] || new Date(customer.birthDate) < new Date(oldestPerCity[customer.address.city].birthDate)) {
				oldestPerCity[customer.address.city] = customer;
			}
		});

		return oldestPerCity;
	};

	const oldestCustomers = getOldestPerCity(customers);

	return (
		<table className="customer-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				{customers.map(customer => (
					<tr key={customer.id} style={{ backgroundColor: highlightOldest && oldestCustomers[customer.address.city]?.id === customer.id ? 'lightblue' : 'white' }}>
						<td>{customer.firstName} {customer.lastName}</td>
						<td>{customer.address.city}</td>
						<td>{new Date(customer.birthDate).toLocaleDateString()}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CustomerList;
