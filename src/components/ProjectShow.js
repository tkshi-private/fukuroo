import React, { Component } from 'react';
import {observer} from "mobx-react";

@observer
class ProjectShow extends Component {
  render() {
    return (
      <div className="App">
        <h1>プロジェクト詳細画面</h1>
        <div>
          プロジェクトタイトル<br />
          プロジェクトの日付
        </div>
        <div>
          プロジェクトイメージ
        </div>
        <div>
          プロジェクトの時価評価額
        </div>
        <div>
          プロジェクトの概要
        </div>
        <div>
          プロジェクトオーナー<br />
          プロジェクトメンバー
        </div>
        <div>
          <h3>募集内容</h3>
          役割<br />
          募集状況<br />
          ストックオプション　¥999 / 100口
        </div>
      </div>
    );
  }
}

export default ProjectShow;
