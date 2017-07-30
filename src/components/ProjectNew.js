import React, { Component } from 'react';

import firebase from 'firebase';
import {observer} from "mobx-react";
import state from '../store/state';

//import state from 'store/state';

@observer
class ProjectNew extends Component {
  constructor() {
    super()

    this.state = {
      project: {
        title: '',
        abstract: '',
        image_url: '',
        owner_uid: '',
        valuation: '',
        created_at: '',
        category: '',
        income: '',
        address: '',
        tel: '',
        birthday: '',
        incomeType: '',
        taxType: '',
      },
      isSaving: false,
      files: null,
      uploadedFile: null,
    }

    this.addProject = this.addProject.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateAbstract = this.updateAbstract.bind(this);
    this.updateValuation = this.updateValuation.bind(this);
    this.updateCreated_at = this.updateCreated_at.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateIncome = this.updateIncome.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateTel = this.updateTel.bind(this);
    this.updateBirthday = this.updateBirthday.bind(this);
    this.updateIncomeType = this.updateIncomeType.bind(this);
    this.updateTaxType = this.updateTaxType.bind(this);
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
        <h1>新しい副業をはじめる</h1>

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
            <label>プロジェクトの種類</label>
            <textarea
              value={this.state.project.category}
              onChange={this.updateCategory}
              className="form-control"></textarea>
          </div>

          <div className="form-group">
            <label>プロジェクトの概要</label>
            <textarea
              value={this.state.project.abstract}
              onChange={this.updateAbstract}
              className="form-control"></textarea>
          </div>

          <div className="form-group">
            <label>プロジェクトの開始日</label>
            <textarea
              value={this.state.project.created_at}
              onChange={this.updateCreated_at}
              className="form-control"></textarea>
          </div>

          <div className="form-group">
            <label>予想年収</label>
            <textarea
              value={this.state.project.income}
              onChange={this.updateIncome}
              className="form-control"></textarea>
          </div>

          <div className="form-group">
            <label>登記場所</label>
            <textarea
              value={this.state.project.address}
              onChange={this.updateAddress}
              className="form-control"></textarea>
          </div>

          <div className="form-group">
            <label>電話番号</label>
            <textarea
              value={this.state.project.tel}
              onChange={this.updateTel}
              className="form-control"></textarea>
          </div>

          <div className="form-group">
            <label>生年月日</label>
            <textarea
              value={this.state.project.birthday}
              onChange={this.updateBirthday}
              className="form-control"></textarea>
          </div>

          <div className="form-group">
            <label>収入の種類</label>
            <textarea
              value={this.state.project.incomeType}
              onChange={this.updateIncomeType}
              className="form-control"></textarea>
          </div>

          <div className="form-group">
            <label>確定申告の種類</label>
            <textarea
              value={this.state.project.taxType}
              onChange={this.updateTaxType}
              className="form-control"></textarea>
          </div>

          <button
            className="btn btn-primary btn-block col-sm-12"
            disabled={this.state.isSaving}
            onClick={this.addProject}>
            この内容で登記する
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

  updateCreated_at(event) {
    const newProject = this.state.project;
    newProject.created_at = event.target.value;
    this.setState({project: newProject});
  }

  updateCategory(event) {
    const newProject = this.state.project;
    newProject.category = event.target.value;
    this.setState({project: newProject});
  }

  updateIncome(event) {
    const newProject = this.state.project;
    newProject.income = event.target.value;
    this.setState({project: newProject});
  }

  updateIncomeType(event) {
    const newProject = this.state.project;
    newProject.incomeType = event.target.value;
    this.setState({project: newProject});
  }

  updateAddress(event) {
    const newProject = this.state.project;
    newProject.address = event.target.value;
    this.setState({project: newProject});
  }

  updateTel(event) {
    const newProject = this.state.project;
    newProject.tel = event.target.value;
    this.setState({project: newProject});
  }

  updateBirthday(event) {
    const newProject = this.state.project;
    newProject.birthday = event.target.value;
    this.setState({project: newProject});
  }

  updateTaxType(event) {
    const newProject = this.state.project;
    newProject.taxType = event.target.value;
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
        created_at: this.state.project.created_at,
        owner: state.currentUser.uid,
        valuation: '100000',
        category: this.state.project.category,
        income: this.state.project.income,
        address: this.state.project.address,
        tel: this.state.project.tel,
        birthday: this.state.project.birthday,
        incomeType: this.state.project.incomeType,
        taxType: this.state.project.taxType,
      }).then(res => {
        this.setState({ isSaving: false })
        this.props.history.push('/projects')
      });
    });


  }
}

export default ProjectNew;
