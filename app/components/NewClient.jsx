import React, { Component } from 'react';
import styles from './Team.css';
import ModalWrapper from './ModalWrapper';

export default class NewClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '',
      secret: ''
    };
  }
  render() {
    return (
      <div className={styles.modalContainer} style={{ width: '500px' }}>
        <div className={styles.modalTitle} >Add Client</div>
        <button className={styles.modalClose} onClick={this.props.close} />
        <div className={styles.modalContent} />
      </div>
    );
  }
}
