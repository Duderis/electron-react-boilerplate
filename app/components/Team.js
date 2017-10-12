import React, { Component } from 'react';
import styles from './Team.css';

export default class Team extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.props.team);
  }

  handleChange(e){
    this.props.changeTeam({name:e.target.value});
  }

  drawTeams(arr){

  }

  drawUsers(arr){

  }

  drawBoards(arr){
    
  }

  render(){
    let teamName = this.props.team.name || '';
    return (
      <div className={styles.content}>
        <div className={styles.listBlock}>
          Teams
          <ul>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
        <div className={styles.formBlock}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Team Name
              <input onChange={this.handleChange} type="text" value={teamName}/>
            </label>
            <div className={styles.listBlock}>
              Users
              <ul>
                <li>item</li>
                <li>item</li>
                <li>item</li>
              </ul>
            </div>
            <div className={styles.listBlock}>
              Boards
              <ul>
                <li>item</li>
                <li>item</li>
                <li>item</li>
              </ul>
            </div>
            <input type="submit" value="Submit"/>
          </form>
        </div>
        {this.props.children}
      </div>);
  }
}
