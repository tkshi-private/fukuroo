import React, { Component } from 'react'

import { Link } from 'react-router-dom'
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
      }
    });

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
