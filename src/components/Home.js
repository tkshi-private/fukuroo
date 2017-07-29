import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import {observer} from "mobx-react";
import projects from '../store/projects';
import state from '../store/state'

@observer
class Home extends Component {
  render() {
    if(!state.currentUser) {
      return (
        <div className="App">
          <h1>FUKUROO</h1>

          <LoginButton></LoginButton>
        </div>
      )
    }

    return (
      <div className="App">
        <h1>FUKUROO</h1>

        {this.renderWorkOrWake()}

      </div>
    );
  }

  renderWorkOrWake() {
    if(state.currentHour >= 9 && state.currentHour < 17) {
      return (
        <Link to='/projects'>
          <button className="btn btn-danger btn-block" disabled>
            WORK
          </button>
        </Link>
      )
      
    } else {

      return (
        <Link to='/projects'>
          <button className="btn btn-success btn-block">
            WAKE
          </button>
        </Link>
      )
    }

  }
}

export default Home;
