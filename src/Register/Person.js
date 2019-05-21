import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Person = ({ propPerson, addPerson }) => {
	if (propPerson === null) {
		propPerson = { name: '', age: '' };
	}
	const [person, setPerson] = useState(propPerson);
	function handleChange(e) {
		const { name, value } = e.target;
		setPerson(p => {
			return { ...p, [name]: value };
		});
	}
	const { name, age } = person;
	alert('person here.');
	return (
		<div>
			<Form.Group controlId="personname">
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" name="name" onChange={handleChange} value={name} />
			</Form.Group>
			<Form.Group controlId="age">
				<Form.Label>Age</Form.Label>
				<Form.Control as="select" name="age" value={age} onChange={handleChange}>
					<option value="">Select one</option>
					<option value="minor">Under 18</option>
					<option value="adult">Over 18</option>
				</Form.Control>
			</Form.Group>
			<Button
				onClick={e => {
					e.preventDefault();
					addPerson(person);
				}}
			>
				Submit
			</Button>
		</div>
	);
};
export default Person;
