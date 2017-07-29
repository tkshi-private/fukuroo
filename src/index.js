import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {startSyncFirebaseData} from './syncFirebase';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
startSyncFirebaseData();
