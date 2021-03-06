import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import AriaModal from 'react-aria-modal';
import Person from './Person';

function RegisterForm({
	price,
	success,
	setSuccess,
	lunchOptions,

	banquetOptions,

	tab,
	setTab,
	registration,
	addRegistration,
	handleChange,
	peopleList,
	addPerson,
	editPerson,
	selectedPerson,
	editPersonMode,
	showPerson,
	showAddPerson,
}) {
	const {
		lunch,
		banquet,
		email,
		name,
		address,
		city,
		state,
		zip,
		brailleMonitor,
		brailleMonitorFormat,
		childCare,
		breakfast,
	} = registration;

	return (
		<div>
			<Form
				onSubmit={e => {
					e.preventDefault();
					addRegistration();
				}}
			>
				<Tabs>
					<TabList>
						<Tab>Main</Tab>
						<Tab>Food Options</Tab>
						<Tab>People</Tab>
						<Tab>Miscellaneous</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Form.Group controlId="name">
								<Form.Label>Name</Form.Label>
								<Form.Control value={name} onChange={handleChange} type="text" name="name" />
							</Form.Group>

							<Form.Group controlId="address">
								<Form.Label>Address</Form.Label>
								<Form.Control value={address} onChange={handleChange} type="text" name="address" />
							</Form.Group>
							<Form.Group controlId="city">
								<Form.Label>City</Form.Label>
								<Form.Control value={city} onChange={handleChange} type="text" name="city" />
							</Form.Group>
							<Form.Group controlId="state">
								<Form.Label>State</Form.Label>
								<Form.Control value={state} onChange={handleChange} name="state" as="select">
									<option value="AL">AL</option>
									<option value="AK">AK</option>
									<option value="AR">AR</option>
									<option value="AZ">AZ</option>
									<option value="CA">CA</option>
									<option value="CO">CO</option>
									<option value="CT">CT</option>
									<option value="DC">DC</option>
									<option value="DE">DE</option>
									<option value="FL">FL</option>
									<option value="GA">GA</option>
									<option value="HI">HI</option>
									<option value="IA">IA</option>
									<option value="ID">ID</option>
									<option value="IL">IL</option>
									<option value="IN">IN</option>
									<option value="KS">KS</option>
									<option value="KY">KY</option>
									<option value="LA">LA</option>
									<option value="MA">MA</option>
									<option value="MD">MD</option>
									<option value="ME">ME</option>
									<option value="MI">MI</option>
									<option value="MN">MN</option>
									<option value="MO">MO</option>
									<option value="MS">MS</option>
									<option value="MT">MT</option>
									<option value="NC">NC</option>
									<option value="NE">NE</option>
									<option value="NH">NH</option>
									<option value="NJ">NJ</option>
									<option value="NM">NM</option>
									<option value="NV">NV</option>
									<option value="NY">NY</option>
									<option value="ND">ND</option>
									<option value="OH">OH</option>
									<option value="OK">OK</option>
									<option value="OR">OR</option>
									<option value="PA">PA</option>
									<option value="RI">RI</option>
									<option value="SC">SC</option>
									<option value="SD">SD</option>
									<option value="TN">TN</option>
									<option value="TX">TX</option>
									<option value="UT">UT</option>
									<option value="VT">VT</option>
									<option value="VA">VA</option>
									<option value="WA">WA</option>
									<option value="WI">WI</option>
									<option value="WV">WV</option>
									<option value="WY">WY</option>
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="zip">
								<Form.Label>Zip</Form.Label>
								<Form.Control value={zip} onChange={handleChange} type="text" name="zip" />
							</Form.Group>
							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control value={email} onChange={handleChange} type="text" name="email" />
							</Form.Group>
						</TabPanel>
						<TabPanel>
							<Form.Group controlId="lunch">
								<Form.Label>Saturday Lunch</Form.Label>
								<Form.Control as="select" name="lunch" onChange={handleChange} value={lunch}>
									<option value="">Select a Lunch (optional)</option>
									{lunchOptions}
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="banquet">
								<Form.Label>Saturday Banquet</Form.Label>
								<Form.Control as="select" name="banquet" onChange={handleChange} value={banquet}>
									<option value="">Select a Banquet (optional)</option>
									{banquetOptions}
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="chapterbreakfast">
								<Form.Check
									type="checkbox"
									label="chapter Breakfast:$5"
									name="breakfast"
									checked={breakfast}
									onChange={handleChange}
								/>
							</Form.Group>
						</TabPanel>

						<TabPanel>
							Add any additional registrants here. Price is $10 for those under 18 and $15 for all others.
							<br />
							<ul>{peopleList}</ul>
							<Button
								onClick={e => {
									e.preventDefault();

									showAddPerson();
								}}
							>
								add Person
							</Button>
							{showPerson ? (
								<AriaModal titleText="Add Person">
									<Person
										propPerson={selectedPerson}
										addPerson={addPerson}
										editPerson={editPerson}
										editPersonMode={editPersonMode}
									/>
								</AriaModal>
							) : (
								false
							)}
						</TabPanel>
						<TabPanel>
							<Form.Group controlId="brailleMonitor">
								<Form.Label>Subscribe to Braille Monitor</Form.Label>
								<Form.Check
									type="checkbox"
									checked={brailleMonitor === true}
									onChange={handleChange}
									name="brailleMonitor"
								/>
							</Form.Group>
							{brailleMonitor && (
								<Form.Group controlId="brailleMonitorFormat">
									<Form.Label>Braille Monitor Format</Form.Label>
									<Form.Control
										as="select"
										value={brailleMonitorFormat}
										onChange={handleChange}
										name="brailleMonitorFormat"
									>
										<option value="">Select one</option>
										<option>Braille</option>
										<option>USB</option>
									</Form.Control>
								</Form.Group>
							)}
							<Form.Group controlId="childCare">
								<Form.Check
									type="checkbox"
									label="Child Care Required?"
									checked={childCare}
									onChange={handleChange}
									name="childCare"
								/>
							</Form.Group>
						</TabPanel>
					</TabPanels>
				</Tabs>
				<Button type="submit">Submit</Button>
			</Form>
			{success && (
				<AriaModal titleText="Success!">
					<div>
						Your Registration was added successfully.
						<br />
						<Button
							onClick={e => {
								setSuccess(false);
							}}
						>
							OK
						</Button>
					</div>
				</AriaModal>
			)}
			<div aria-live="polite" aria-atomic="true">
				Total Price: ${parseFloat(price).toFixed(2)}
			</div>
		</div>
	);
}
export default RegisterForm;
