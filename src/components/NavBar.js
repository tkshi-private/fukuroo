import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import _ from 'lodash';
import firebase from 'firebase';
import {observer} from "mobx-react";
import state from '../store/state'
import users from '../store/user'

@observer
class NavBar extends Component {
  render() {
    if(!state.loginStateFetched) {
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
}

export default NavBar
