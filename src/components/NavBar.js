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
      currentUser: null,
      dataFetched: false,
    }
  }

  render() {
    const currentUser = this.state.currentUser ?
      <span>ユーザー {this.state.currentUser.email}</span> :
      <button onClick={this.login}>SignIn</button>;

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
            <li><Link to="/projects/1">プロジェクト詳細</Link></li>
          </ul>

          <hr/>
        </div>
      </div>
    )
  }

  setCurrentUser(user) {
    this.setState({
      currentUser: {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      }
    })
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({dataFetched: true})
        this.setCurrentUser(user);
      }
    });

  }

  login() {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      this.setState({dataFetched: true})
      // This gives you a Facebook Access Token.
      // You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log("Signed in", user, token)

      this.setCurrentUser(user);

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

}

export default NavBar
