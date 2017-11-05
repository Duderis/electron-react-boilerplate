import React, { Component } from 'react';
import _ from 'lodash';
import shortid from 'shortid';
import { ipcRenderer } from 'electron';
import base64 from 'base-64';
import styles from './Team.css';
import NewClient from './NewClient';

export default class ClientList extends Component {
  constructor(props) {
    super(props);
    this.oauth2Button = this.oauth2Button.bind(this);
    this.state = {
      clients: [],
      showModal: false,
      selected: {}
    };
  }

  componentDidMount() {
    ipcRenderer.send('read-user');
    ipcRenderer.once('read-user-reply', (event, obj) => {
      const { user } = obj;
      const headers = new Headers();
      headers.append('Authorization', `Basic ${base64.encode(`${user.username}:${user.password}`)}`);
      fetch(
        'http://localhost:8080/api/clients',
        {
          headers
        }
      )
        .then(response => response.json())
        .then(clients => this.setState({ ...this.state, clients }));
    });
  }

  oauth2Button() {
    ipcRenderer.send('my-oauth', this.state.selected);
  }

  renderClients(clients) {
    return _.map(clients, client => (
      <li
        key={shortid.generate()}
        onClick={() => this.setState({ ...this.state, selected: client })}
        className={this.state.selected._id === client._id ? styles.selected : ''}
      >
        {client.name}
      </li>));
  }


  render() {
    return (
      <div className={styles.listBlock}>
        {this.renderClients(this.state.clients)}
        <button onClick={() => this.setState({ ...this.state, showModal: !this.state.showModal })}>new</button>
        {this.state.showModal ? (<NewClient close={() => this.setState({ ...this.state, showModal: false })} />) : ''}
        <button onClick={this.oauth2Button}>Oauth2</button>
      </div>);
  }
}
