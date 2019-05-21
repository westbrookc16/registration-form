import React from 'react';

import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import RegisterContainer from './Register/RegisterContainer';
import SignIn from './SignIn';
import Home from './Home';
import Navigation from './Navigation';
import '@reach/dialog/styles.css';
function App() {
	return (
		<div className="App">
			<Router>
				<Navigation />
				<Route path="/register" component={RegisterContainer} />
				<Route path="/signin" component={SignIn} />
				<Route path="/" exact component={Home} />
			</Router>
		</div>
	);
}

export default App;
