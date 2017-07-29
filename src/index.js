import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp(firebaseConfig);
// const provider = new firebase.auth.FacebookAuthProvider();
// provider.setCustomParameters({
//   'display': 'redirect'
// });

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {

//     // User is signed in.

//   } else {

//     firebase.auth().signInWithPopup(provider).then(function(result) {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var token = result.credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;

//       console.log('Signed in as', token, user)

//     }).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;

//       console.error('error', errorCode, errorMessage, email, credential)
//     });
//   }
// });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
