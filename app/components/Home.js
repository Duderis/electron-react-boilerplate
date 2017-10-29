// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { ipcRenderer } from 'electron';
import classnames from 'classnames';
import _ from 'lodash';
import styles from './Home.css';

import Content from '../containers/Content';
// import Sidebar from './Sidebar';
import { get } from '../utils/requestFunctions';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.activeTabClass = classnames(styles.navBarTab, styles.navBarTabActive);
    this.tabClass = styles.navBarTab;
    this.loadAllData = this.loadAllData.bind(this);
    this.drawContent = this.drawContent.bind(this);
  }
  oauth2Button() {
    ipcRenderer.send('my-oauth', 'getToken');
    ipcRenderer.once('my-oauth-reply', (event, { accessToken }) => {
      // console.log(accessToken);
    });
  }

  loadAllData() {
    get('team', (err, res, body) => { this.props.loadTeams(JSON.parse(body)); });
    get('user', (err, res, body) => { this.props.loadUsers(JSON.parse(body)); });
    get('task', (err, res, body) => { this.props.loadTasks(JSON.parse(body)); });
    get('board', (err, res, body) => { this.props.loadBoards(JSON.parse(body)); });
    get('lane', (err, res, body) => { this.props.loadLanes(JSON.parse(body)); });
  }

  componentDidMount() {
    this.loadAllData();
  }

  switchTab(ele: Object) {
    return () => { this.props.switchTab(ele); };
  }

  drawTabs(arr: Array<Object>) {
    return _.map(arr, (ele) => {
      let cn = this.tabClass;
      if (this.props.activeTab.id === ele.id) {
        cn = this.activeTabClass;
      }
      return (
        <li
          key={shortid.generate()}
          className={cn}
          onClick={this.switchTab(ele)}
        >
          {ele.name}
        </li>);
    });
  }


  drawContent() {
    if (this.props.users === []) { return 'Loading'; }
    return (<Content />);
  }

  render() {
    const initialTabs = this.drawTabs([{ id: -1, name: 'teams', type: 'team' }, { id: -2, name: 'boards', type: 'board' }]);
    const taskTabs = this.drawTabs(this.props.openTasks);
    const content = this.drawContent();
    return (
      <div className={styles.outer}>
        <div className={styles.appContainer}>
          <ul className={styles.navBar}>
            <ul className={styles.navBarTabs}>
              {initialTabs}
              {taskTabs}
              <li className={styles.navBarIcon}><i className="fa fa-plus-circle" /></li>
            </ul>
            <ul className={styles.navBarOther}>
              <li className={styles.navBarIcon}><i className="fa fa-cog" /></li>
              <li className={styles.navBarIcon}><i className="fa fa-refresh" /></li>
              <li className={styles.navBarUser}>user</li>
            </ul>
          </ul>
          <div className={styles.mainBlock1}>
            {content}
          </div>
        </div>
      </div>

    );
  }
}
