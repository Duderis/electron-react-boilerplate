import React, { Component } from 'react';
import Team from '../containers/Team';
import Board from '../containers/Board';

export default class Content extends Component {
  drawChild() {
    switch (this.props.activeTab.type) {
      case 'board':
        return (<Board />);
      default:
        return (<Team />);
    }
  }

  render() {
    return this.drawChild();
  }
}
