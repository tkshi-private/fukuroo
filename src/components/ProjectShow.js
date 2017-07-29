import React, { Component } from 'react';

import _ from 'lodash';
import {observer} from "mobx-react";
import projects from '../store/projects'

@observer
class ProjectShow extends Component {

  render() {
    const project = _.find(projects, p => p.pid === parseInt(this.props.match.params.id))

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
          プロジェクトオーナー：{project.owner}<br />
          プロジェクトメンバー：{project.members}
        </div>
      </div>
    );
  }
}

export default ProjectShow;
