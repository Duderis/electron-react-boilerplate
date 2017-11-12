import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import styles from './Team.css';
import { post, put } from '../utils/requestFunctions';

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addElement = this.addElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.reloadTeam = this.reloadTeam.bind(this);
    this.loadNewTeam = this.loadNewTeam.bind(this);
    this.clearTeam = this.clearTeam.bind(this);
  }

  reloadTeam(body) {
    const { teams, team } = this.props;
    const index = _.findIndex(teams, innerTeam => innerTeam._id === body._id);
    this.props.loadTeams([...teams.slice(0, index),
      { ...teams[index], ...body },
      ...teams.slice(index + 1)]);
    this.props.changeTeam({ ...team, ...body });
  }

  loadNewTeam(body) {
    const { teams, team } = this.props;
    this.props.loadTeams([...teams, body]);
    this.props.changeTeam({ ...team, ...body });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.team._id) {
      put('team', (err, res, body) => this.reloadTeam(JSON.parse(body)), this.props.team, this.props.team.teamId, this.props.token);
    } else {
      post('team', (err, res, body) => this.loadNewTeam(JSON.parse(body)), this.props.team, this.props.token);
    }
  }

  handleSelect(id) {
    this.props.changeTeam(_.find(this.props.teams, team => team.teamId === id));
  }

  handleChange(e) {
    this.props.changeTeam({ name: e.target.value });
  }

  drawTeams(arr) {
    return _.map(arr, element => (
      <li
        className={this.props.team._id === element._id ? styles.selected : {}}
        onClick={() => this.handleSelect(element.teamId)}
        key={shortid.generate()}
      >

        {element.name}
      </li>));
  }

  clearTeam() {
    this.props.clearTeam();
  }

  removeElement(element, type) {
    if (_.keys(this.props.team).length === 0) {
      return;
    }
    const index = _.findIndex(this.props.team[type], ele => ele._id === element._id);
    if (this.props.team[type].length === 1) {
      this.props.changeTeam({ [type]: [] });
    } else if (index !== -1) {
      this.props.changeTeam({
        [type]: [
          ...this.props.team[type].slice(0, index),
          ...this.props.team[type].slice(index + 1)
        ]
      });
    }
  }

  addElement(element, type) {
    if (_.keys(this.props.team).length === 0) {
      this.props.changeTeam({ [type]: [element._id] });
    } else if (_.findIndex(this.props.team[type], ele => ele._id === element._id) === -1) {
      this.props.changeTeam({
        [type]: [
          ...this.props.team[type],
          element._id
        ]
      });
    }
  }

  drawElement(arr, type, identifier) {
    return _.map(arr, (element) => {
      const button = _.findIndex(this.props.team[type], ele => ele === element._id) === -1
        ? (<span style={{ paddingLeft: '5px' }} onClick={() => { this.addElement(element, type); }}><i className="fa fa-plus-circle" /></span>)
        : <span style={{ paddingLeft: '5px' }} onClick={() => { this.removeElement(element, type); }}><i className="fa fa-minus-circle" /></span>;
      return (
        <li key={shortid.generate()}>
          {element[identifier]}
          {button}
        </li>);
    });
  }

  render() {
    const teamName = this.props.team.name || '';
    return (
      <div className={styles.content}>
        <div className={styles.listBlock}>
          <span className={styles.label}>Teams</span>
          <hr />
          <ul>
            {this.drawTeams(this.props.teams)}
          </ul>
        </div>
        <div className={styles.formBlock}>
          <form onSubmit={this.handleSubmit}>
            <label>
              <span onClick={this.clearTeam} className={styles.clearButton}>Clear</span>
              <span className={styles.label}>Team Name:</span>
              <input onChange={this.handleChange} type="text" value={teamName} placeholder="Enter team name" />
            </label>
            <div className={styles.listBlock}>
              <span className={styles.label}>Users</span>
              <hr />
              <ul>
                {this.drawElement(this.props.users, 'users', 'username')}
              </ul>
            </div>
            <div className={styles.listBlock}>
              <span className={styles.label}>Boards</span>
              <hr />
              <ul>
                {this.drawElement(this.props.boards, 'boards', 'name')}
              </ul>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        {this.props.children}
      </div>);
  }
}
