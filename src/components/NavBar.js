import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import _ from 'lodash';
import firebase from 'firebase';
import {observer} from "mobx-react";
import state from '../store/state';
import users from '../store/user';

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
        <div className="col-xs-3 text-right">
          <Link to={`/users/${state.currentUser.uid}/joined`}>
          <img
            className="img-circle"
            alt={userObject.email}
            src={userObject.photoURL}/>
          </Link>
      </div>;

    return (
      <div className="row">
        <div className="col-xs-3 padding-top">
          <Link to="/">ホーム</Link>
        </div>

        <div className="col-xs-6 padding-top">
          <Link to="/projects">プロジェクト</Link>
        </div>

        {currentUserBlock}

        <hr/>
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
