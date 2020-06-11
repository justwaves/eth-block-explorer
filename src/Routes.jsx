import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainPage from 'pages/MainPage';

const Routes = () => (
  <Switch>
    <Route
      path={['/block/:id/:hash', '/block/:id', '/']}
      component={MainPage}
    />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
