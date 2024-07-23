import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC<object> = () => {
const [customers, setCustomers] = useState<Customer[]>([]);

	return (
		<div className="container">
			<h1>Customer Management</h1>
		</div>
	);
};

export default App;
