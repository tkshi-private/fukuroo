import React, { Component } from 'react';

import {observer} from "mobx-react";
import projects from '../store/projects';

@observer
class Employee extends Component {
  render() {
    return (
      <div className="App">
        <h1>あなたの会社の社員一覧</h1>
      </div>
    );
  }
}

export default Employee;
