// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import {ipcRenderer} from 'electron';

export default class Home extends Component {
  oauth2Button(){
    ipcRenderer.send('my-oauth', 'getToken');
    ipcRenderer.once('my-oauth-reply',(event,{accessToken})=>{
      console.log(accessToken);
    })
  }
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Clock</Link>
          <button onClick={this.oauth2Button.bind(this)}>oauth2</button>
        </div>
      </div>
    );
  }
}
