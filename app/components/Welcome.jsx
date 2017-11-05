import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styles from './Team.css';
import Login from './Login';
import { get, post } from '../utils/requestFunctions';
import ClientList from './ClientList';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.renderStep = this.renderStep.bind(this);
    this.determineStep = this.determineStep.bind(this);
    this.readToken = this.readToken.bind(this);
    this.state = {
      step: 0
    };
  }
  async componentDidMount() {
    await this.determineStep();
  }

  async determineStep() {
    await this.readToken();
  }

  async readToken() {
    ipcRenderer.send('read-token');
    ipcRenderer.once('read-token-reply', (event, token) => {
      const trimmedToken = _.trim(token);
      if (trimmedToken) {
        this.props.setToken(trimmedToken);
        this.setState({ ...this.state, step: 5 });
      }
      this.setState({ ...this.state, step: 3 });
    });
  }

  readUser() {
    ipcRenderer.send('read-user');
    ipcRenderer.once('read-user-reply', (event, user) => {
      const trimmedUser = _.trim(user);
      console.log(trimmedUser);
    });
  }


  renderStep() {
    // step 0: Welcome screen
    // step 1: Enter User screen
    // step 2: Register User screen
    // step 3: Choose client screen
    // step 4: Oauth2 Button screen
    // step 5: Everything is Ready screen
    switch (this.state.step) {
      case 5:
        return (<div><h1>Everything is Ready!</h1><Link to="main">Continue!</Link></div>);
      case 4:
      case 3:
        return (<ClientList />);
      case 2:
      case 1:
        return (<Login />);
      default:
        return (<h1>Welcome</h1>);
    }
  }
  render() {
    this.determineStep();
    return (
      <div className={styles.contentCenter}>
        <div className={styles.contentColumn}>
          {this.renderStep()}
        </div>
      </div>
    );
  }
}
