import React, { Component } from 'react';

import firebase from 'firebase';
import {observer} from "mobx-react";

@observer
class ProjectNew extends Component {
  constructor() {
    super()

    this.state = {
      project: {
        title: '',
        abstract: '',
        image_url: '',
        owner_id: '',
        valuation: '',
      },
      isSaving: false,
      files: null,
      uploadedFile: null,
    }

    this.addProject = this.addProject.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateAbstract = this.updateAbstract.bind(this);
    this.updateValuation = this.updateValuation.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  render() {
    const showImage = this.state.uploadedFile ?
      <img
        className="img-thumbnail"
        src={this.state.uploadedFile}/> :
      '';

    return (
      <div className="ProjectNew">
        <h1>新規プロジェクト登録</h1>

        <form>
          <div className="form-group">
            <label>プロジェクト名</label>
            <input
              value={this.state.project.title}
              onChange={this.updateTitle}
              className="form-control"
              type="text"/>
          </div>

          <div className="form-group">
            <label>イメージ</label>
            <input
              className="form-control"
              type="file"
              name="image"
              accept="image/*"
              onChange={this.handleFileSelect}/>

            {showImage}
          </div>

          <div className="form-group">
            <label>時価総額</label>
            <input
              type="number"
              value={this.state.project.valuation}
              onChange={this.updateValuation}
              className="form-control"/>
          </div>

          <div className="form-group">
            <label>詳細</label>
            <textarea
              value={this.state.project.abstract}
              onChange={this.updateAbstract}
              className="form-control"></textarea>
          </div>

          <button
            className="btn btn-primary btn-block col-sm-12"
            disabled={this.state.isSaving}
            onClick={this.addProject}>
            登録
          </button>
        </form>
      </div>
    );
  }

  updateTitle(event) {
    const newProject = this.state.project;
    newProject.title = event.target.value;
    this.setState({project: newProject});
  }

  updateAbstract(event) {
    const newProject = this.state.project;
    newProject.abstract = event.target.value;
    this.setState({project: newProject});
  }

  updateValuation(event) {
    const newProject = this.state.project;
    newProject.valuation = event.target.value;
    this.setState({project: newProject});
  }

  handleFileSelect(event) {
    event.stopPropagation();
    event.preventDefault();
    const files = event.target.files;
    this.setState({files: files})

    const reader = new FileReader();

    reader.onload = (e) => {
      this.setState({uploadedFile: e.target.result})
    }

    reader.readAsDataURL(files[0]);

  }

  uploadFile(event) {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();

      if(this.state.files.length === 1) {
        const randomId = Math.random().toString(25).replace(/[^a-z]+/g, '');
        const file = this.state.files[0];

        storageRef.child(`projectImages/${randomId}`)
          .put(file).then((snapshot) => {
            resolve(snapshot);
          }).catch(error => reject(error));
      } else {
        reject('Error uploading')
      }
    })
  }

  addProject(event) {
    event.preventDefault();
    this.setState({ isSaving: true })

    this.uploadFile()
    .then((snapshot) => {
      const projectRef = firebase.database().ref("projects")
      const newProjectRef = projectRef.push({
        title: this.state.project.title,
        abstract: this.state.project.abstract,
        image_url: snapshot.downloadURL,
        created_at: new Date(),
      }).then(res => {
        this.setState({ isSaving: false })
        this.props.history.push('/projects')
      });
    });


  }
}

export default ProjectNew;
