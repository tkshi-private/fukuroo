import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import _ from 'lodash';
import firebase from 'firebase';
import {observer} from "mobx-react";

const provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
  'display': 'iframe'
});


@observer
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      dataFetched: false,
      alreadyAdded: false,
    }
    this.login = this.login.bind(this);
  }

  render() {
    const currentUser = this.state.currentUser ?
      <img
        className="img-circle"
        alt={this.state.currentUser.email}
        src={this.state.currentUser.photoURL}/> :
      <button className="btn btn-default" onClick={this.login}>
        SignIn
      </button>;

    const currentUserBlock = this.state.dataFetched ?
          <div className="row">
            <div className="col-sm-12 text-right">
              {currentUser}
            </div>
          </div> : "";

    return (
      <div className="row">
        <div className="col-sm-12">

          {currentUserBlock}

          <ul className="list-inline">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">プロジェクト一覧</Link></li>
          </ul>

          <hr/>
        </div>
      </div>
    )
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({dataFetched: true, currentUser: user})
        this.addIfNotExistingUser(user)
      } else {
        this.setState({dataFetched: true, currentUser: null})
      }
    });

  }

  addIfNotExistingUser(user) {
    if(this.state.alreadyAdded) return;

    this.setState({alreadyAdded: true})
    const usersRef = firebase.database().ref("users")
    usersRef.on('value', (snapshot) => {
      usersRef.off('value');
      const users = snapshot.val()
      const existingUser = _.find(users, u => u.email === user.email);

      if(existingUser) {
        console.log('User already exists, not adding');
        return
      }

      const userObject = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
      console.log('Adding new user', userObject);
      const newUsersRef = firebase.database().ref("users");
      const newUserRef = newUsersRef.push(userObject);

    })

  }

  login() {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Facebook Access Token.
      // You can use it to access the Facebook API.
      // var token = result.credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      this.setState({currentUser: user})
      this.addIfNotExistingUser(user);

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;

      console.error('error', errorCode, errorMessage, email, credential)
    });
  }

}

export default NavBar
