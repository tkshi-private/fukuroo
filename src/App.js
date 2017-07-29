import {
  Link,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Home from './components/Home'
import ProjectIndex from './components/ProjectIndex'
import ProjectShow from './components/ProjectShow'
import React from 'react'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/project">プロジェクト一覧</Link></li>
        <li><Link to="/project/1">プロジェクト詳細</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route exact path="/project" component={ProjectIndex} />
      <Route path="/project/:id" component={ProjectShow}/>
    </div>
  </Router>
)




export default BasicExample
