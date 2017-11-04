import React, { Component } from 'react';
import styles from './Team.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: '',
      psw: ''
    };
  }
  render() {
    return (
      <form>
        <div className={styles.contentColumn}>
          <label>Username: </label>
          <input type="text" />
          <label>Password: </label>
          <input type="password" />
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}
