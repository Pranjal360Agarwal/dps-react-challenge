import React, { useEffect, useState } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import Filter from './components/Filter';
import dpsLogo from './assets/DPS.svg';


interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  address: {
    city: string;
  };
  birthDate: string;
}

const App: React.FC<object> = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [filterName, setFilterName] = useState('');
	const [filterCity, setFilterCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://dummyjson.com/users');
			const data = await response.json();
			setCustomers(data.users);
		};

		fetchData();
	}, []);

	const handleNameFilter = (name: string) => {
		setFilterName(name);
	};

	const handleCityFilter = (city: string) => {
		setFilterCity(city);
	};

	const handleHighlightChange = (highlight: boolean) => {
		setHighlightOldest(highlight);
	};
	const filteredCustomers = customers
		.filter(customer => 
			customer.firstName.toLowerCase().includes(filterName.toLowerCase()) || 
		customer.lastName.toLowerCase().includes(filterName.toLowerCase())
		)
		.filter(customer => filterCity ? customer.address.city === filterCity : true);

	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<p>Your solution goes here 😊</p>
			</div>
			<div className="container">
				<Filter 
					onNameFilter={handleNameFilter} 
					onCityFilter={handleCityFilter} 
					onHighlightChange={handleHighlightChange} 
					customers={customers} 
				/>
				<CustomerList customers={filteredCustomers} highlightOldest={highlightOldest} />
			</div>
		</>
	);
};

export default App;
