import React, { Component } from 'react';

class ProjectNew extends Component {
  render() {
    return (
      <div className="ProjectNew">
        <h1>新規プロジェクト登録</h1>

        <form>
          <div className="form-group">
            <label>プロジェクト名</label>
            <input className="form-control" type="text"/>
          </div>

          <div className="form-group">
            <label>イメージ</label>
            <input className="form-control" type="text"/>
          </div>

          <div className="form-group">
            <label>詳細</label>
            <textarea className="form-control"></textarea>
          </div>

          <button className="btn btn-primary btn-block col-sm-12">
            登録
          </button>
        </form>
      </div>
    );
  }
}

export default ProjectNew;
