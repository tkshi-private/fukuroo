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
class LoginButton extends Component {
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
        <div onClick={this.login}>
          <img src="/03_2_login_btn_login.png" alt="ログイン"/>
        </div>
      )
    }

    return <div></div>
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

export default LoginButton

