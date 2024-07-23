import React, { useState, useEffect } from 'react';

interface FilterProps {
  onNameFilter: (name: string) => void;
  onCityFilter: (city: string) => void;
  onHighlightChange: (highlight: boolean) => void;
  customers: { address: { city: string } }[];
}

const Filter: React.FC<FilterProps> = ({ onNameFilter, onCityFilter, onHighlightChange, customers }) => {
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [highlight, setHighlight] = useState(false);

	useEffect(() => {
		const debounce = setTimeout(() => {
			onNameFilter(name);
		}, 1000);

		return () => clearTimeout(debounce);
	}, [name, onNameFilter]);

	return (
		<div className="filter-container">
			<input 
				type="text" 
				placeholder="Name" 
				value={name} 
				onChange={e => setName(e.target.value)} 
				className="filter-input"
			/>
			<select 
				onChange={e => {
					setCity(e.target.value);
					onCityFilter(e.target.value);
				}} 
				className="filter-select"
			>
				<option value="">Select city</option>
			</select>
			<label className="highlight-checkbox">
				<input 
					type="checkbox" 
					checked={highlight} 
					onChange={e => {
						setHighlight(e.target.checked);
						onHighlightChange(e.target.checked);
					}} 
				/> Highlight oldest per city
			</label>
		</div>
	);
};

export default Filter;
