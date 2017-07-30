import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import _ from 'lodash';
import firebase from 'firebase';
import {observer} from "mobx-react";
import state from '../store/state';
import users from '../store/user';

import './NavBar.css'

@observer
class NavBar extends Component {
  render() {
    if(!state.loginStateFetched || state.hideNavBar) {
      return <div></div>
    }

    if(!state.currentUser) {
      return (
        <LoginButton></LoginButton>
      )
    }

    let userObject = _.find(users, d =>
      d.email === state.currentUser.email
    );

    if(!userObject) {
      userObject = state.currentUser;
    }

    const currentUserBlock =
      <div className="nav-icon-area">
          <Link to={`/users/${state.currentUser.uid}/joined`}>
          <img
            className="img-circle"
            alt={userObject.email}
            src={userObject.photoURL}/>
          </Link>
      </div>;

    return (
      <div className="container NavBar">
        <div className="nav-area">
          <div className="nav-button-area">
            <Link to="/"><img className="icon-image-area icon-arrow" src="../../arrow_for_list_r.png" alt=">" /></Link>
          </div>

          <div className="main-title">
            <Link to="/projects">プロジェクト</Link>
          </div>

          {currentUserBlock}

          <hr/>
        </div>
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // navigated!
    }
  }
}

export default NavBar
