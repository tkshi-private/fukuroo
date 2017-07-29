import './ProjectIndex.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import _ from 'lodash';
import { observer } from "mobx-react";
import projects from '../store/projects';

@observer
class ProjectIndex extends Component {
  render() {
    const list = _.map(projects, (project) => {
      return (
        <div className="project-container" key={project.pid}>
          <div className="image-area">
            <img className="image-project" src={project.image_url} alt="icon" />
          </div>
          <div className="row">
            <div>{`¥${project.valuation}`}</div>
            <div>{project.title}</div>
            <div>{`${project.abstract.substring(0,25)}...`}</div>
          </div>
          <div className="button-area">
            <Link to={`/projects/${project.pid}`}><img className="icon-image-area" src="../../btn_ list_arrow.png" alt=">" /></Link>
          </div>
        </div>
      );
    })

    return (
      <div className="App">
        <h3>募集中</h3>
        <div className="list-container">
          {list}
        </div>
      </div>
    );
  }
}

export default ProjectIndex;
