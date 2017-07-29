import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import _ from 'lodash';
import firebase from 'firebase';
import {observer} from "mobx-react";
import state from '../store/state'
import users from '../store/user'

const provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
  'display': 'popup'
});


@observer
class NavBar extends Component {
  constructor() {
    super();

    this.login = this.login.bind(this);
  }

  render() {
    if(!state.loginStateFetched) {
      return <div></div>
    }

    if(!state.currentUser) {
      return (
        <button className="btn btn-default" onClick={this.login}>
          SignIn
        </button>
      )
    }

    let userObject = _.find(users, d =>
      d.email === state.currentUser.email
    );

    if(!userObject) {
      userObject = state.currentUser;
    }

    const currentUserBlock = 
      <div className="row">
        <div className="col-xs-4 col-xs-offset-8 text-right">
          <img
            className="img-circle"
            alt={userObject.email}
            src={userObject.photoURL}/>
        </div>
      </div>;

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

  login() {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Facebook Access Token.
      // You can use it to access the Facebook API.
      // var token = result.credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      state.currentUser = user;
      console.log('logged in as', user)
      // this.setState({currentUser: user})

      // This will trigger in onAuthStateChanged so not needed
      // this.addIfNotExistingUser(user);

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
