import React, { Component } from 'react';
import shortid from 'shortid';
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
    const index = teams.findIndex(innerTeam => innerTeam._id === body._id);
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
    this.props.team._id
      ? put('team', (err, res, body) => this.reloadTeam(JSON.parse(body)), this.props.team, this.props.team.teamId)
      : post('team', (err, res, body) => this.loadNewTeam(JSON.parse(body)), this.props.team);
  }

  handleSelect(id) {
    this.props.changeTeam(this.props.teams.find(team => team.teamId === id));
  }

  handleChange(e) {
    this.props.changeTeam({ name: e.target.value });
  }

  drawTeams(arr) {
    return arr.map((element, index) => (<li
      className={this.props.team._id === element._id ? styles.selected : {}}
      onClick={() => this.handleSelect(element.teamId)}
      key={shortid.generate()}
    >{element.name}
    </li>));
  }

  clearTeam() {
    this.props.clearTeam();
  }

  removeElement(element, type) {
    if (Object.keys(this.props.team).length === 0) {
      return;
    }
    const index = this.props.team[type].findIndex((ele) => ele._id === element._id);
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
    if (Object.keys(this.props.team).length === 0) {
      this.props.changeTeam({ [type]: [element._id] });
    } else if (this.props.team[type].findIndex((ele) => ele._id === element._id) === -1) {
      this.props.changeTeam({
        [type]: [
          ...this.props.team[type],
          element._id
        ]
      });
    }
  }

  drawElement(arr, type, identifier) {
    return arr.map((element) => {
      const button = this.props.team[type].findIndex((ele) => ele === element._id) === -1
        ? (<span onClick={() => { this.addElement(element, type); }}>+</span>)
        : <span onClick={() => { this.removeElement(element, type); }}>-</span>;
      return (<li key={shortid.generate()}>
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
          Teams
          <hr />
          <ul>
            {this.drawTeams(this.props.teams)}
          </ul>
        </div>
        <div className={styles.formBlock}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Team Name <span onClick={this.clearTeam}> x </span>
              <input onChange={this.handleChange} type="text" value={teamName} />
            </label>
            <div className={styles.listBlock}>
              Users
              <hr />
              <ul>
                {this.drawElement(this.props.users, 'users', 'username')}
              </ul>
            </div>
            <div className={styles.listBlock}>
              Boards
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
