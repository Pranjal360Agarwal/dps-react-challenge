import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC<object> = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://dummyjson.com/users');
			const data = await response.json();
			setCustomers(data.users);
		};

		fetchData();
	}, []);

	return (
		<div className="container">
			<h1>Customer Management</h1>
		</div>
	);
};

export default App;
