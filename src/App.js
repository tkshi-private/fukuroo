import React from 'react'
import ProjectIndex from './components/ProjectIndex'
import ProjectShow from './components/ProjectShow'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

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
      <Route path="/project" component={ProjectIndex} />
      <Route path="/project/:id" component={ProjectShow}/>
    </div>
  </Router>
)




export default BasicExample
