import './ProjectIndex.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import _ from 'lodash';
import { observer } from "mobx-react";
import projects from '../store/projects';
import state from '../store/state'

@observer
class ProjectIndex extends Component {
  render() {
    const list = _.map(projects, (project) => {
      return (
        <Link to={`/projects/${project.pid}`}>
        <div className="project-container" key={project.pid}>
          <div className="image-area">
            <img className="image-project" src={project.image_url} alt="icon" />
          </div>
          <div className="detail-area">
            <div className="label-valuation">{`¥ ${project.valuation.toString().replace(/(\d)(?=(\d{3})+$)/g,'$1,')}`}</div>
            <div className="title">{`${project.title.substring(0, 12)}...`}</div>
            <div className="abstract">{`${project.abstract.substring(0,24)}...`}</div> 
          </div>
          <div className="button-area">
            <img className="icon-image-area icon-arrow" src="../../arrow_for_list.png" alt=">" />
          </div>
        </div>
        </Link>
      );
    })

    return (
      <div className="App">
        <div className="list-container">
          {list}
        </div>
      </div>
    );
  }

  componentWillMount() {
    if(this.props.location.pathname === '/') {
      state.hideNavbar = true;
    } else {
      state.hideNavbar = false;
    }
  }
}

export default ProjectIndex;
