import firebase from 'firebase'
import config from './config/firebase'
import projects from './store/projects'
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

export function startSyncFirebaseData(){
  var starCountRef = firebase.database().ref('projects/');
  starCountRef.on('value', function(snapshot) {
    projects.push(snapshot.val()['-KqCBf092NKmFktgywPp'])
  });
}
