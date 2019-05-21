import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseContext from './firebase/firebase';
const SignIn = () => {
	const fireBase = useContext(FirebaseContext);
	const config = { signInOptions: [fireBase.emailProvider], signInSuccessUrl: '/register' };

	return (
		<div>
			<h1>Sign In</h1>
			<StyledFirebaseAuth uiConfig={config} firebaseAuth={fireBase.auth} />
		</div>
	);
};
export default SignIn;
