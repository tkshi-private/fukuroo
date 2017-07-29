import React, { Component } from 'react'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Home from './components/Home'
import NavBar from './components/NavBar'
import ProjectIndex from './components/ProjectIndex'
import ProjectNew from './components/ProjectNew'
import ProjectShow from './components/ProjectShow'
import JoinedProjectIndex from './components/JoinedProjectIndex'

class App extends Component {
  render() {
    return (
    <Router>
      <div className="container">

        <NavBar></NavBar>

        <div className="row"></div>
          <div className="col-sm-12">

            <Route exact path="/" component={Home}/>
            <Route exact path="/projects" component={ProjectIndex} />
            <Route exact path="/new-project" component={ProjectNew} />
            <Route path="/projects/:id" component={ProjectShow}/>
            <Route path="/users/:id/joined" component={JoinedProjectIndex}/>
            {/* <Route path="/company/:id" component={Company}/> */}

        </div>
      </div>
    </Router>
    )
  }

}

export default App
