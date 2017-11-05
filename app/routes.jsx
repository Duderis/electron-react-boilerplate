/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/Home';
import Welcome from './containers/Welcome';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/main" component={HomePage} />
    </Switch>
  </App>
);
