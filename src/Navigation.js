import React, { useContext } from 'react';
import UserContext from './firebase/UserContext';
import { Link } from 'react-router-dom';
const Navigation = () => {
	const user = useContext(UserContext);
	return (
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to={user ? '/register' : '/signin'}>Register</Link>
				</li>
			</ul>
		</div>
	);
};
export default Navigation;
