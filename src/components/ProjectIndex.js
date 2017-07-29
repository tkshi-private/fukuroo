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
        <div className="list-item" key={project.pid}>
          <div className="image-area">
            <img src={project.image_url} alt="icon" />
          </div>
          <div className="row">
            <div>{project.valuation}</div>
            <div>{project.title}</div>
            <div>{project.abstract}</div>
          </div>
          <div className="valuation-area">
            <button className="btn btn-default">
              <Link to={`/projects/${project.pid}`}><img src="" alt=">" /></Link>
            </button>
          </div>
        </div>
      );
    })

    return (
      <div className="App">
        <h3>プロジェクト一覧画面</h3>
        <button className="btn btn-default">
          <Link to="/new-project">新規プロジェクト追加</Link>
        </button>

        <div className="list-container">
          {list}
        </div>
      </div>
    );
  }
}

export default ProjectIndex;
