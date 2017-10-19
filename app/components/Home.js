// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { ipcRenderer } from 'electron';
import classnames from 'classnames';

import styles from './Home.css';
import Content from '../containers/Content';
import Sidebar from './Sidebar';
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

  switchTab(name, type) {
    return () => { this.props.switchTab(name, type); };
  }

  drawTabs(arr) {
    // console.log('drawing')
    const tabs = [];
    const that = this;
    arr.forEach((ele, index) => {
      let cn = that.tabClass;
      if (that.props.activeTab.name === ele.name) {
        cn = that.activeTabClass;
      }
      tabs.push((<li key={shortid.generate()} className={cn} onClick={that.switchTab(ele.name, ele.type)}>{ele.name}</li>));
    });
    return tabs;
  }

  drawContent() {
    if (this.props.users === []) { return 'Loading'; }
    return (<Content />);
  }

  render() {
    const tabs = this.drawTabs([{ name: 'teams', type: 'team' }, { name: 'boards', type: 'board' }]);
    const content = this.drawContent();
    return (
      <div className={styles.outer}>
        <div className={styles.appContainer}>
          <ul className={styles.navBar}>
            <ul className={styles.navBarTabs}>
              {tabs}
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
