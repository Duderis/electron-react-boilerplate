import React, { Component } from 'react';
import styles from './Team.css';

export default class Team extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
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
    return arr.map(element => <li>{element.name}</li>);
  }

  addUser(element){
    if(Object.keys(this.props.team).length == 0){
      this.props.changeTeam({users:[{_id:element._id}]});
    }else if(this.props.team.users.findIndex((ele)=>{return ele._id==element._id})===-1){
      this.props.changeTeam({users:[
          ...this.props.team.users,
          {_id:element._id}
      ]});
    }
  }

  removeUser(element){
    if(Object.keys(this.props.team).length == 0){
      return
    }
    let index = this.props.team.users.findIndex((ele)=>{return ele._id==element._id});
    if(this.props.team.users.length===1){
      this.props.changeTeam({users:[]});
    }else if(index!==-1){
      this.props.changeTeam({users:[
        ...this.props.team.users.slice(0, index),
        ...this.props.team.users.slice(index+1)
      ]})
    }
  }

  drawUsers(arr){
    return arr.map((element,index) => {let button = this.props.team.users.findIndex((ele)=>{return ele._id==element._id})===-1 ? <span onClick={()=>{this.addUser(element)}}>
      +
    </span> : <span onClick={()=>{this.removeUser(element)}}>-</span>;
    return <li key={index+'smth'}>
        {element.username}
        {button}
      </li>});
  }

  drawBoards(arr){
    return arr.map(element => <li>{element.name}</li>);
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
                {this.drawUsers(this.props.users)}
              </ul>
            </div>
            <div className={styles.listBlock}>
              Boards
              <ul>
                {this.drawBoards(this.props.boards)}
              </ul>
            </div>
            <input type="submit" value="Submit"/>
          </form>
        </div>
        {this.props.children}
      </div>);
  }
}
