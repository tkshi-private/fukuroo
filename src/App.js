import React, { Component } from 'react'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Home from './components/Home'
import NavBar from './components/NavBar'
import ProjectIndex from './components/ProjectIndex'
import ProjectShow from './components/ProjectShow'

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
            <Route path="/projects/:id" component={ProjectShow}/>

        </div>
      </div>
    </Router>
    )
  }

}

export default App
