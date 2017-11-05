import React, { Component } from 'react';
import _ from 'lodash';
import shortid from 'shortid';
import styles from './Team.css';
import { get } from '../utils/requestFunctions';
import NewClient from './NewClient';

export default class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      showModal: false
    };
  }

  componentDidMount() {
    // get('clients', (res, err, body) => this.setState({ ...this.state, clients: JSON.parse(body) }));
  }

  renderClients(clients) {
    return _.map(clients, client => (
      <li
        key={shortid.generate()}
      >
        hi
      </li>));
  }

  render() {
    return (
      <div className={styles.listBlock}>
        {this.renderClients(this.state.clients)}
        <button onClick={() => this.setState({ ...this.state, showModal: !this.state.showModal })}>new</button>
        {this.state.showModal ? (<NewClient close={() => this.setState({ ...this.state, showModal: false })} />) : ''}
      </div>);
  }
}
