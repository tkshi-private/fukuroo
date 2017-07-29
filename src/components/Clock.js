import './Clock.css'

import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import {observer} from "mobx-react";
import state from '../store/state'

@observer
class Clock extends Component {
  constructor() {
    super()
    this.state = {
      minutes: 0
    }
    setInterval(() => {
      this.setState({minutes: this.state.minutes + 1});
      if(this.state.minutes >= 60) {
        this.setState({minutes: 0});
        state.currentHour += 1
        if(state.currentHour >= 24) {
          state.currentHour = 0;
        }
      }
    }, 100)
  }

  render() {
    return (
      <div className="Clock">
        {state.currentHour}:{this.renderPrefixedMinutes()}
      </div>
    );
  }

  renderPrefixedMinutes() {
    if(this.state.minutes < 10) {
      return '0' + this.state.minutes
    }
    return this.state.minutes
  }
}

export default Clock;
