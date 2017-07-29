import React, { Component } from 'react';

import {observer} from "mobx-react";
import projects from '../store/project'

@observer
class ProjectShow extends Component {
  render() {
    const project = {members: {}}
    return (
      <div className="App">
        <h1>プロジェクト詳細画面</h1>
        <div>
          プロジェクトタイトル：{project.title}<br />
          プロジェクトの日付：{project.created_at}
        </div>
        <div>
          プロジェクトイメージ：{project.image_url}
        </div>
        <div>
          プロジェクトの時価評価額：{project.valuation}
        </div>
        <div>
          プロジェクトの概要：{project.abstract}
        </div>
        <div>
          プロジェクトオーナー：{project.owner}<br />
<<<<<<< HEAD
          プロジェクトメンバー：//{project.members[]}
        </div>
        <div>
          <h3>募集内容</h3>
          役割：//{project.members[].role}<br />
          募集状況：//{project.members[].member}<br /> //同一roleのうち、memberが空じゃない／memberの数
=======
          プロジェクトメンバー：{project.members}
        </div>
        <div>
          <h3>募集内容</h3>
          役割：{project.members.role}<br />
          募集状況：{project.members.member}<br /> //同一roleのうち、memberが空じゃない／memberの数
>>>>>>> 2f20bf20447bd4b51c65b25dc7a9c05e9caf3930
          ストックオプション　¥999 / 100口 //
        </div>
      </div>
    );
  }
}

export default ProjectShow;
