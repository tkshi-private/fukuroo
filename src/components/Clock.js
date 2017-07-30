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
    }, 500)

    this.toggleDayOrNight = this.toggleDayOrNight.bind(this);
  }

  render() {
    return (
      <div className="Clock" onClick={this.toggleDayOrNight}>
        {this.renderPrefixedNumber(state.currentHour)}:{this.renderPrefixedNumber(this.state.minutes)}
      </div>
    );
  }

  renderPrefixedNumber(number) {
    if(number < 10) {
      return '0' + number;
    }
    return number;
  }

  toggleDayOrNight(event) {
    if(state.currentHour >= 9 && state.currentHour < 17) {
      state.currentHour = 17;
      this.setState({minutes: 0});
      console.log(this.props.location);
    } else {
      state.currentHour = 9;
      this.setState({minutes: 0});
    }
  }
}

export default Clock;
