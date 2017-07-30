import React, { Component } from 'react';

import {observer} from "mobx-react";
import projects from '../store/projects';
import './Employee.css'

@observer
class Employee extends Component {
  render() {
    return (
      <div className="App">
        <img src={'../../corporation.jpg'} />
      </div>
    );
  }
}

export default Employee;
