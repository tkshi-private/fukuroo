import {
  Link,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Home from './components/Home'
import ProjectIndex from './components/ProjectIndex'
import ProjectShow from './components/ProjectShow'
import React from 'react'

const App = () => (
  <Router>
    <div className="container">
      <div className="row">
        <div className="col-sm-12">

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/project">プロジェクト一覧</Link></li>
          <li><Link to="/project/1">プロジェクト詳細</Link></li>
        </ul>

        <hr/>
      </div>
    </div>

    <div className="row"></div>
      <div className="col-sm-12">
        <Route exact path="/" component={Home}/>
        <Route exact path="/project" component={ProjectIndex} />
        <Route path="/project/:id" component={ProjectShow}/>

      </div>
    </div>
  </Router>
)




export default App
