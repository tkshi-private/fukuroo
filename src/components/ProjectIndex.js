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
      var projectTitle;
      if(project.title.length > 18){
        projectTitle = project.title.substring(0, 18) + "...";
      } else {
        projectTitle = project.title;
      }
      return (
        <Link to={`/projects/${project.pid}`}>
        <div className="listitem-container" key={project.pid}>
          <div className="listitem-thumb-area">
            <img className="thumb-project" src={project.image_url} alt="icon" />
          </div>
          <div className="listitem-contents-area">
            <div className="label-valuation">{`¥ ${project.valuation.toString().replace(/(\d)(?=(\d{3})+$)/g,'$1,')}`}</div>
            <div className="project-title">{projectTitle}</div>
            <div className="project-abstract">{`${project.abstract.substring(0,21)}...`}</div>
          </div>
          <div className="listitem-button-area">
            <img className="icon-arrow" src="../../arrow_for_list.png" alt=">" />
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
