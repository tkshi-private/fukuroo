import './ProjectIndex.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import _ from 'lodash';
import firebase from 'firebase';
import { observer } from "mobx-react";
import projects from '../store/projects';
import state from '../store/state';
import users from '../store/user';

@observer
class JoinedProjectIndex extends Component {
  renderUserInfo() {
    const user = _.find(users, u => u.uid === this.props.match.params.id)
    if(user){
      return (
        <div className="userinfo-area">
          <img className="img-circle" src={user.photoURL} />
          <div>{user.name}</div>
        </div>
      );
    } else {
      return (
        <div className="userinfo-area"></div>
      );
    }
  }

  render() {
    if(!state.loginStateFetched) {
      return <div></div>
    }

    const ownProjects = _.filter(projects, p => {
      return _.find(p.members, m => m.uid === this.props.match.params.id)
    });

    const list = _.map(ownProjects, (project) => {
      var projectTitle;
      if(project.title.length > 18){
        projectTitle = project.title.substring(0, 18) + "...";
      } else {
        projectTitle = project.title;
      }
      return (
        <Link to={`/projects/${project.pid}`}>
        <div className="listitem-container" key={project.pid}>
          <div className="icon-owner">
            <img src="../../05_jolined_project_list_icon_owner.png" alt=">" />
          </div>
          <div className="listitem-thumb-area">
            <img className="image-project" src={project.image_url} alt="icon" />
          </div>
          <div className="listitem-contents-area">
            <div className="label-valuation">{`¥ ${project.valuation.toString().replace(/(\d)(?=(\d{3})+$)/g,'$1,')}`}</div>
            <div className="project-title">{projectTitle}</div>
            <div className="project-abstract">{`${project.abstract.substring(0,21)}...`}</div>
          </div>
          <div className="icon-volatility">
            <img src="../../05_jolined_project_list_icon_up.png" alt="+" />
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
        { this.renderUserInfo() }
        <div className="list-container">
          {list}
        </div>
        <div className="create-button-area">
          <Link to="/new-project"><img id="create-button" src="../../05_jolined_project_list_btn_add_progect.png" alt="+" /></Link>
        </div>
      </div>
    );
  }
}

export default JoinedProjectIndex;
