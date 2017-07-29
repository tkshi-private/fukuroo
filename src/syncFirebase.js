import _ from 'lodash';
import config from './config/firebase'
import firebase from 'firebase'
import projects from './store/projects'
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

export function startSyncFirebaseData(){
  // var starCountRef = firebase.database().ref('projects/');
  // starCountRef.on('value', function(snapshot) {
  //   projects.push(snapshot.val()['-KqCBf092NKmFktgywPp'])
  // });

  // sync projects
  const projectsRef = firebase.database().ref('projects');

  // projectsRef.on('value', (data) => {
  //   _.map(data.val(), (value, key) => {
  //     const newProject = value;
  //     newProject.pid = key;
  //     projects.push(newProject)
  //   })
  // })

  projectsRef.on('child_added', (data) => {
    console.log('added', data.val())
    const newProject = data.val();
    newProject.pid = data.key;
    projects.push(newProject);
  });

  projectsRef.on('child_changed', (data) => {
    console.log('changed', data.val())
    const newProject = data.val();
    newProject.pid = data.key;
    const index = _.findIndex(projects, p => p.pid === data.key)
    projects[index] = newProject;
  });

  projectsRef.on('child_removed', (data) => {
    console.log('removed', data.val())
    const index = _.findIndex(projects, p => p.pid === data.key)
    projects.splice(index, 1)
  });
}
