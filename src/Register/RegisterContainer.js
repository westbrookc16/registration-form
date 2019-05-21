import React, { useState, useContext } from 'react';
import UserContext from './../firebase/UserContext';

import RegisterForm from './RegisterForm';
import { lunch, banquet } from './../Constants/Foods';
const RegisterContainer = () => {
	function createFoodOptions(food) {
		const foodOptions = food.map(i => {
			return <option key={i.value} value={i.value}>{`${i.name}-${i.price}`}</option>;
		});
		return foodOptions;
	}
	const lunchOptions = createFoodOptions(lunch);
	const banquetOptions = createFoodOptions(banquet);

	const user = useContext(UserContext);
	const [registration, setRegistration] = useState({
		name: user.displayName,
		email: user.email,
		address: '',
		city: '',
		state: 'PA',
		zip: '',
		lunch: '',
		banquet: '',
		breakfast: '',
		brailleMonitor: false,
		brailleMonitorFormat: '',
		childCare: false,
	});
	const [people, setPeople] = useState([]);
	function handleChange(e) {
		const { name, value } = e.target;
		setRegistration(r => {
			return { ...r, [name]: value };
		});
	}
	const peopleList = people.map((p, idx) => {
		const { name } = p;
		return <li key={idx}>{name}</li>;
	});
	function showAddPerson() {
		setSelectedPerson({ name: '', age: '' });
		setShowPerson(true);
	}
	function addPerson(p) {
		setPeople(c => {
			return c.concat(p);
		});
	}
	function editPerson(editedPerson, idx) {
		setPeople(c => {
			c.map((person, i) => {
				if (i === idx) {
					return editedPerson;
				} else {
					return person;
				}
			});
		});
	}
	const [tab, setTab] = useState('main');
	const [showPerson, setShowPerson] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState({ name: '', age: '' });
	return (
		<RegisterForm
			selectedPerson={selectedPerson}
			showPerson={showPerson}
			handleChange={handleChange}
			addPerson={addPerson}
			editPerson={editPerson}
			peopleList={peopleList}
			registration={registration}
			tab={tab}
			setTab={setTab}
			lunchOptions={lunchOptions}
			banquetOptions={banquetOptions}
			showAddPerson={showAddPerson}
		/>
	);
};
export default RegisterContainer;