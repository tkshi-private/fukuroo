import './ProjectIndex.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import _ from 'lodash';
import firebase from 'firebase';
import { observer } from "mobx-react";
import projects from '../store/projects';
import state from '../store/state';
import users from '../store/user';

//import url('https://fonts.googleapis.com/css?family=Open+Sans');

@observer
class JoinedProjectIndex extends Component {
  renderUserInfo() {
    const user = _.find(users, u => u.uid === this.props.match.params.id)
    return (
      <div className="user-info">
        <img className="img-circle" src={user.photoURL} />
        <div>{user.name}</div>
      </div>
    );
  }
  //-KqCnu38CyFFsBpYGXVv

  render() {
    if(!state.loginStateFetched) {
      return <div></div>
    }

    const ownProjects = _.filter(projects, p => {
      return _.find(p.members, m => m.uid === this.props.match.params.id)
    });

    const list = _.map(ownProjects, (project) => {
      return (
        <div className="project-container" key={project.pid}>
          <div className="image-area-joined">
            <img className="icon-owner" src="../../05_jolined_project_list_icon_owner.png" alt=">" />
            <img className="image-project" src={project.image_url} alt="icon" />
          </div>
          <div className="detail-area">
            <div className="label-valuation">{`¥ ${project.valuation.toString().replace(/(\d)(?=(\d{3})+$)/g,'$1,')}`}</div>
            <div className="title">{`${project.title.substring(0,12)}...`}</div>
            <div className="abstract">{`${project.abstract.substring(0,24)}...`}</div>
          </div>
          <div className="button-area-joined">
            <img className="icon-image-area" src="../../05_jolined_project_list_icon_up.png" alt=">" />
            <Link to={`/projects/${project.pid}`}><img className="icon-image-area icon-arrow" src="../../arrow_for_list.png" alt=">" /></Link>
          </div>
        </div>
      );
    })

    return (
      <div className="App">
        { this.renderUserInfo() }
        <div className="list-container">
          {list}
        </div>
        <div className="flex-create-project">
          <Link to="/new-project"><img id="create-project" src="../../05_jolined_project_list_btn_add_progect.png" alt=">" /></Link>
        </div>
      </div>
    );
  }
}

export default JoinedProjectIndex;
