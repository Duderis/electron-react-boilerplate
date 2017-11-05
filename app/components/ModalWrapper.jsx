import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.portalElement = null;
  }
  componentDidMount() {
    this.portalElement = document.createElement('div');
    document.querySelector('.app').appendChild(this.portalElement);
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
  }

  componentWillUnmount() {
    document.querySelector('.app').removeChild(this.portalElement);
  }

  render() {
    return null;
  }
}
