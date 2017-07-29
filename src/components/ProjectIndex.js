import React, { Component } from 'react';
import './ProjectIndex.css';
import { observer } from "mobx-react";

import { Link } from 'react-router-dom'
@observer
class ProjectIndex extends Component {
  render() {
    let image_url = 'http://kyuryou-soshiki.kanagawa-u.ac.jp/aiti/wp-content/uploads/sites/43/2015/10/sample-icon.png';
    let title = 'みんなで起業！';
    let abstract = '日本にイノベーションを起こすために、新しい事業を創発しましょう。';
    let valuation = '¥10,000,000';

    let list = [];
    let data = [
       {  }
      ,{  }
      ,{  }
    ];

    for(let i in data){
      list.push(
        <div className="list-item">
          <div className="image-area">
            <img src={image_url} alt="icon" />
          </div>
          <div className="row">
            <div>{valuation}</div>
            <div>{title}</div>
            <div>{abstract}</div>
          </div>
          <div className="valuation-area">
            <div>button</div>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>プロジェクト一覧画面</h1>
        <button>
          <Link to="/new-project">新規プロジェクト追加</Link>
        </button>
        <div className="list-container">
          {list}
        </div>
      </div>
    );
  }
}

export default ProjectIndex;
