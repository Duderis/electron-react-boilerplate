import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import styles from './Team.css';
import NewUser from './NewUser';
import { ipcRenderer } from 'electron';

export default class UserView extends Component {
  constructor(props) {
    super(props);
  }

  oauth2Button() {
    ipcRenderer.send('my-oauth', 'getToken');
    ipcRenderer.once('my-oauth-reply', (event, accessToken) => {
      console.log(accessToken);
    });
  }

  readTokenButton() {
    ipcRenderer.send('read-token');
    ipcRenderer.once('read-token-reply', (event, token) => {
      console.log(token);
    });
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.contentColumn}>
          Hi Im users
          <button onClick={this.oauth2Button}> Oauth2 </button>
          <button onClick={this.readTokenButton}> ReadButton </button>
          <Link to="/" style={{ color: '#000' }}>Logout</Link>
        </div>
        <div className={styles.contentColumn}>
          <NewUser />
        </div>
      </div>
    );
  }
}
