import './ProjectShow.css'

import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';
import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import _ from 'lodash';
import firebase from 'firebase';
import moment from 'moment';
import {observer} from "mobx-react";
import projects from '../store/projects';
import state from '../store/state';
import users from '../store/user';

const dummyData = [
  {name: "2017/7/6", uv: 400, pv: 2400, amt: 2400},
  {name: "2017/7/7", uv: 100, pv: 2400, amt: 2400},
  {name: "2017/7/8", uv: 600, pv: 2400, amt: 2400},
  {name: "2017/7/9", uv: 400, pv: 2400, amt: 2400},
  {name: "2017/7/10", uv: 300, pv: 2400, amt: 2400},
  {name: "2017/7/11", uv: 200, pv: 2400, amt: 2400},
  {name: "2017/7/12", uv: 100, pv: 2400, amt: 2400},
  {name: "2017/7/13", uv: 1000, pv: 2400, amt: 2400},
];
const SimpleAreaChart = React.createClass({
	render () {
    const valuationHistory = this.props.project.valuation_history;
    let data;
    if(!valuationHistory) {
      data = dummyData;
    } else {
      data = _.map(valuationHistory, (d, i) => {
        const date = moment().subtract(valuationHistory.length - i, 'days').format('YYYY/MM/DD')
        console.log(d)
        return {
          name: date,
          uv: d
        }
      });
    }


  	return (
    	<AreaChart width={350} height={200} data={data}
            margin={{top: 10, right: 30, left: 20, bottom: 0}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    );
  }
})

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
      <div className="ProjectShow">
        <h1>{project.title}</h1>
        <img src={project.image_url} alt={project.title}/>
        <div>
          <SimpleAreaChart project={project}/>
        </div>
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
    const project = _.find(projects, p => p.pid === this.props.match.params.id)
    // console.log(member.stock_share)
    // console.log(project.valuation)
    if(!member.uid && !this.hasAlreadyRole()) {
      button = (
        <button className="btn btn-blue btn-block" onClick={(event) => this.joinAsMember(event, key)}>
          参加する
        </button>
      )
    } else if(state.currentUser && member.uid === state.currentUser.uid){
      button = (
        <button className="btn btn-danger btn-block" onClick={(event) => this.removeMember(event, key)}>
          やめる
        </button>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col-xs-3">
            {this.renderUserImage(member.uid)}
          </div>

          <div className="col-xs-6">
            {this.renderUserByUid(member.uid)}<br/>
            役割 {member.role}<br/>
            報酬株 {member.stock_share}<br/>
            現在評価額 ¥{(Number(member.stock_share.replace('%','') / 100) * project.valuation).toLocaleString()}
          </div> 
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            {button}
          </div>
        </div>
      </div>
    )
  }

  renderUserImage(uid) {
    const user = _.find(users, u => u.uid === uid)

    if(!user) return ''

    return (
      <Link to={`/users/${user.uid}/joined`}>
        <img className="img-rounded"
          src={user.photoURL}
          alt="none"/>
      </Link>
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
