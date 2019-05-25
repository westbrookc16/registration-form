import React, { useState, useContext, useEffect } from 'react';
import UserContext from './../firebase/UserContext';
import Button from 'react-bootstrap/Button';
import RegisterForm from './RegisterForm';
import { lunch, banquet } from './../Constants/Foods';
import FirebaseContext from './../firebase/firebase';
const RegisterContainer = () => {
	const firebase = useContext(FirebaseContext);
	//load initial data
	const user = useContext(UserContext);
	useEffect(() => {
		firebase.db
			.collection('registrations')
			.doc(user.uid)
			.get()
			.then(doc => {
				//starting for main data fetch
				if (doc.exists) {
					//starting if
					setRegistration({
						...doc.data(),
					});
					//get people now
					firebase.db
						.collection('registrations')
						.doc(user.uid)
						.collection('people')
						.get()
						.then(snapshot => {
							let returnedPeople = [];
							snapshot.forEach(doc => {
								returnedPeople.push({ ...doc.data(), id: doc.id });
							});
							setPeople(returnedPeople);
						});
				}
			});
	}, [firebase.db, user.uid]);
	function addRegistration() {
		firebase.db
			.collection('registrations')
			.doc(user.uid)
			.set(registration)
			.then(a => {
				setPeople(p => {
					return p.map(person => {
						if (isNaN(person.id)) {
							//must update it since it was already added
							const personID = person.id;
							delete person.id;
							firebase.db
								.collection('registrations')
								.doc(user.uid)
								.collection('people')
								.doc(personID)
								.set(person)
								.then(doc => {
									//add ID back for /he UI
									person.id = personID;
								})
								.catch(e => {
									console.log(e);
								});
						} else {
							firebase.db
								.collection('registrations')
								.doc(user.uid)
								.collection('people')
								.add(person)
								.then(doc => {
									person.id = doc.id;
								})
								.catch(e => {
									console.log(e);
								});
						}
						return person;
					});
				});
			});
		setSuccess(true);
	}
	function createFoodOptions(food) {
		const foodOptions = food.map(i => {
			return <option key={i.value} value={i.value}>{`${i.name}-${i.price}`}</option>;
		});
		return foodOptions;
	}
	const lunchOptions = createFoodOptions(lunch);
	const banquetOptions = createFoodOptions(banquet);

	const [registration, setRegistration] = useState({
		name: user.displayName,
		email: user.email,
		address: '',
		city: '',
		state: 'PA',
		zip: '',
		lunch: '',
		banquet: '',
		breakfast: false,
		brailleMonitor: false,
		brailleMonitorFormat: '',
		childCare: false,
	});
	const [success, setSuccess] = useState(false);
	const [people, setPeople] = useState([]);
	function handleChange(e) {
		const { name, value } = e.target;
		setRegistration(r => {
			return { ...r, [name]: value };
		});
	}
	const peopleList = people.map((p, idx) => {
		const { name, id } = p;
		return (
			<li key={id}>
				{name}
				<br />
				<Button
					onClick={e => {
						showEditPerson(idx);
					}}
				>
					Edit
				</Button>
				<Button
					onClick={e => {
						deletePerson(id);
					}}
				>
					Delete
				</Button>
			</li>
		);
	});
	function deletePerson(id) {
		setPeople(p => {
			return p.filter(item => {
				return item.id !== id;
			});
		});
		//now delete from firestore
		firebase.db
			.collection('registrations')
			.doc(user.uid)
			.collection('people')
			.doc(id)
			.delete();
	}
	function showAddPerson() {
		setSelectedPerson({ name: '', age: '' });
		setShowPerson(true);
		setEditPersonMode(false);
	}
	function addPerson(p) {
		setPeople(c => {
			return c.concat({ id: c.length, ...p });
		});
		setShowPerson(false);
	}
	function editPerson(editedPerson, idx) {
		setPeople(c => {
			return c.map((person, i) => {
				if (editedPerson.id === person.id) {
					return editedPerson;
				} else {
					return person;
				}
			});
		});
		setShowPerson(false);
	}
	const showEditPerson = idx => {
		setSelectedPerson(people[idx]);
		setShowPerson(true);
		setEditPersonMode(true);
	};

	const [showPerson, setShowPerson] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState({ name: '', age: '' });
	const [editPersonMode, setEditPersonMode] = useState(false);

	const [tab, setTab] = useState('main');

	return (
		<RegisterForm
			selectedPerson={selectedPerson}
			showPerson={showPerson}
			handleChange={handleChange}
			addPerson={addPerson}
			editPerson={editPerson}
			editPersonMode={editPersonMode}
			peopleList={peopleList}
			registration={registration}
			tab={tab}
			setTab={setTab}
			lunchOptions={lunchOptions}
			banquetOptions={banquetOptions}
			showAddPerson={showAddPerson}
			addRegistration={addRegistration}
			success={success}
			setSuccess={setSuccess}
		/>
	);
};
export default RegisterContainer;
