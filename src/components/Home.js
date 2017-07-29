import React, { Component } from 'react';

import {observer} from "mobx-react";
import projects from '../store/projects';

@observer
class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>{projects[0].title}</h1>
        <h1>ホーム</h1>
      </div>
    );
  }
}

export default Home;
