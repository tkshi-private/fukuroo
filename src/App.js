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

@observer
class App extends Component {
  render() {
    return (
    <Router>
      <div className="container">
        <Switch> 

          <Route exact path="/" component={Home}/>

          <NavBar></NavBar>

          <div className="row">
            <div className="col-sm-12">

              <Route exact path="/projects" component={ProjectIndex} />
              <Route exact path="/new-project" component={ProjectNew} />
              <Route path="/projects/:id" component={ProjectShow}/>
              <Route path="/users/:id/joined" component={JoinedProjectIndex}/>
              <Route path="/companies/:id/users" component={Employee}/>

            </div>
          </div>
        </Switch> 

        <Clock></Clock>
      </div>
    </Router>
    )
  }

}

export default App
