import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from 'pages/Main';
import Search from 'pages/Search';

const Routes = () => (
  <Switch>
    <Route path={['/block/:id/:hash', '/block/:id', '/']} component={Main} />
    <Route path="/search" component={Search} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
