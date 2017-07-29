import './App.css';

import React, { Component } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import Clock from './components/Clock'
import Employee from './components/Employee'
import Home from './components/Home'
import JoinedProjectIndex from './components/JoinedProjectIndex'
import NavBar from './components/NavBar'
import ProjectIndex from './components/ProjectIndex'
import ProjectNew from './components/ProjectNew'
import ProjectShow from './components/ProjectShow'
import {observer} from "mobx-react";
import state from './store/state';

@observer
class App extends Component {
  render() {
    return (
      <Router>
        <div className={`App container ${this.getDayOrNightClass()}`}>

          <NavBar></NavBar>

          <div className="row">
            <div className="col-sm-12">

              <Route exact path="/" component={Home}/>

              <Route exact path="/projects" component={ProjectIndex} />
              <Route exact path="/new-project" component={ProjectNew} />
              <Route path="/projects/:id" component={ProjectShow}/>
              <Route path="/users/:id/joined" component={JoinedProjectIndex}/>
              <Route path="/companies/:id/users" component={Employee}/>

            </div>
          </div>

          <Clock></Clock>
        </div>
      </Router>
    )
  }

  getDayOrNightClass() {
    if(state.currentHour >= 9 && state.currentHour < 17) {
      return 'App--day'
    }
    return 'App--night'
  }

}

export default App
