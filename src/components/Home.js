import React, { Component } from 'react';
import projects from '../store/projects'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>{projects[0].name}</h1>
        <h1>ホーム</h1>
      </div>
    );
  }
}

export default Home;
