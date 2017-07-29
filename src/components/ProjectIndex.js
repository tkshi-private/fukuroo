import React, { Component } from 'react';
import {observer} from "mobx-react";

import { Link } from 'react-router-dom'
@observer
class ProjectIndex extends Component {
  render() {
    return (
      <div className="App">
        <h1>プロジェクト一覧画面</h1>
        <button>
          <Link to="/new-project">新規プロジェクト追加</Link>
        </button>
      </div>
    );
  }
}

export default ProjectIndex;
