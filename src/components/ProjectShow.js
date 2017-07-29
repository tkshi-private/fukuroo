import React, { Component } from 'react';

import _ from 'lodash';
import {observer} from "mobx-react";
import projects from '../store/projects'
import users from '../store/user'

@observer
class ProjectShow extends Component {

  render() {
    const project = _.find(projects, p => p.pid === this.props.match.params.id)

    if(!project) {
      return (
        <div>No project found</div>
      )
    }

    const members = (
        <div>
          <h3>募集内容</h3>
          役割：{project.members.role}<br />
          募集状況：{project.members.member}<br /> //同一roleのうち、memberが空じゃない／memberの数
          ストックオプション　¥999 / 100口 //
        </div>
    )

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
          <ul>
            {_.map(project.members || [], (member, i) => {
              return (
                <li key={i}>
                  {this.renderMember(member)}
                </li>
              )
            })}
          </ul>
          <button className="btn btn-primary">
            参加する
          </button>
        </div>
        <div>
          プロジェクトオーナー：{project.owner}<br />
          {/* プロジェクトメンバー：{project.members}  */}
        </div>
      </div>
    );
  }

  renderMember(member) {
    return (
      <div>
        <div>
          role: {member.role}
        </div>
        <div>
          stock_share: {member.stock_share}
        </div>
        <div>
          user: {this.renderUserByUid(member.uid)}
        </div>
      </div>
    )
  }

  renderUserByUid(uid) {
    const user = _.find(users, u => u.uid === uid)

    if(!user) return '';

    return (
      <span>{user.name}</span>
    )
  }

  addMember() {
  }
}

export default ProjectShow;
