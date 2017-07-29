import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';
import registerServiceWorker from './registerServiceWorker';
import {startSyncFirebaseData} from './syncFirebase';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
startSyncFirebaseData()
