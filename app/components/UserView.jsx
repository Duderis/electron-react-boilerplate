import React, { Component } from 'react';
import _ from 'lodash';
import styles from './Team.css';
import Login from './Login';
import NewUser from './NewUser';
import { ipcRenderer } from 'electron';
import { get, put } from '../utils/requestFunctions';

export default class UserView extends Component {
  constructor(props) {
    super(props);
  }

  oauth2Button() {
    ipcRenderer.send('my-oauth', 'getToken');
    ipcRenderer.once('my-oauth-reply', (event, { accessToken }) => {
      // console.log(accessToken);
    });
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.contentColumn}>
          Hi Im users
          <button onClick={this.oauth2Button}> Oauth2 </button>
        </div>
        <div className={styles.contentColumn}>
          <Login />
          <NewUser />
        </div>
      </div>
    );
  }
}
