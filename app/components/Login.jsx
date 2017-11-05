import React, { Component } from 'react';
import styles from './Team.css';
import { get, post } from '../utils/requestFunctions';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.contentColumn}>
          <label>Username: </label>
          <input value={this.state.username} onChange={e => this.setState({ ...this.state, password: e.target.username })} type="text" />
          <label>Password: </label>
          <input value={this.state.password} onChange={e => this.setState({ ...this.state, password: e.target.value })} type="password" />
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}
