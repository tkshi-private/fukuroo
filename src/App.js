import './App.css';

import React, { Component } from 'react';

import firebase from 'firebase';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hataraco!!</h1>
        <img src="./mig.jpeg" alt="fukuro"></img>
      </div>
    );
  }

  componentWillMount() {
    var ref = firebase.database().ref("users")
    var userId = firebase.auth().currentUser;
    ref.on('value', (snapshot) => {
      console.log(snapshot.val());
    })
  }
}

export default App;
