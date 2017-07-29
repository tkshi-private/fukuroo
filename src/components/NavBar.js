import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import firebase from 'firebase';

const provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
  'display': 'iframe'
});

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  render() {
    const currentUser = this.state.currentUser ?
      (<span>ユーザー {this.state.currentUser.email}</span>) :
      (<button onClick={this.login}>SignIn</button>);
    return (
      <div className="row">
        <div className="col-sm-12">
          
          <div className="pull-right">
            {currentUser}
          </div>

          <ul className="list-inline">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">プロジェクト一覧</Link></li>
            <li><Link to="/projects/1">プロジェクト詳細</Link></li>
          </ul>

          <hr/>
        </div>
      </div>
    )
  }

  login() {
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      this.setState({
        currentUser: {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        }
      })
      console.log('Signed in as', token, user)

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      console.error('error', errorCode, errorMessage, email, credential)
    });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        // User is signed in.

        this.setState({
          currentUser: {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          }
        });

      }
    });

  }
}

export default NavBar
