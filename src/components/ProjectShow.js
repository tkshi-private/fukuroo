import React, { Component } from 'react';

import _ from 'lodash';
import firebase from 'firebase';
import {observer} from "mobx-react";
import projects from '../store/projects';
import state from '../store/state';
import users from '../store/user';

@observer
class ProjectShow extends Component {
  constructor() {
    super();

    this.joinAsMember = this.joinAsMember.bind(this)
    this.removeMember = this.removeMember.bind(this)
  }

  render() {
    const project = _.find(projects, p => p.pid === this.props.match.params.id)

    if(!project) {
      return (
        <div>No project found</div>
      )
    }

    return (
      <div className="App">
        <h1>{project.title}</h1>
        <img src={project.image_url} alt={project.title}/>
        <div>
          プロジェクトの日付：{project.created_at}
        </div>
        <div>
          プロジェクトの時価評価額：{project.valuation}
        </div>
        <div>
          プロジェクトの概要：{project.abstract}
        </div>

        <div>
          <ul className="list-group">
            {_.map(project.members || [], (member, i) => {
              return (
                <li key={i} className="list-group-item">
                  {this.renderMember(member, i)}
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          プロジェクトオーナー：{project.owner}<br />
          {/* プロジェクトメンバー：{project.members}  */}
        </div>
      </div>
    );
  }

  hasAlreadyRole() {
    const project = _.find(projects, p => p.pid === this.props.match.params.id)
    return !!_.find(project.members || [], member => state.currentUser && member.uid === state.currentUser.uid);
  }

  renderMember(member, key) {
    let button = '';

    if(!member.uid && !this.hasAlreadyRole()) {
      button = (
        <button className="btn btn-primary" onClick={(event) => this.joinAsMember(event, key)}>
          参加する
        </button>
      )
    } else if(state.currentUser && member.uid === state.currentUser.uid){
      button = (
        <button className="btn btn-danger" onClick={(event) => this.removeMember(event, key)}>
          やめる
        </button>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-3">
          {this.renderUserImage(member.uid)}
        </div>
        <div className="col-xs-6">
          {this.renderUserByUid(member.uid)}<br/>
          ロール: {member.role}<br/>
          持ち株比率: {member.stock_share}
        </div>

        <div className="col-xs-3">
          {button}
        </div>
      </div>
    )
  }

  renderUserImage(uid) {
    const user = _.find(users, u => u.uid === uid)

    if(!user) return ''

    return (
      <img className="img-rounded"
        src={user.photoURL}
        alt="none"/>
    )
  }

  renderUserByUid(uid) {
    const user = _.find(users, u => u.uid === uid)

    if(!user) return <span className="label label-success">募集中</span>;

    return (
      <span>{user.name}</span>
    )
  }

  joinAsMember(event, memberIndex) {
    event.preventDefault();
    const project = _.find(projects, p => p.pid === this.props.match.params.id)
    project.members[memberIndex].uid = state.currentUser.uid;

    const updates = {};
    updates['/projects/' + this.props.match.params.id] = project;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
  }

  removeMember(event, memberIndex) {
    event.preventDefault();
    const project = _.find(projects, p => p.pid === this.props.match.params.id)
    project.members[memberIndex].uid = '';
    const updates = {};
    updates['/projects/' + this.props.match.params.id] = project;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
  }
}

export default ProjectShow;
