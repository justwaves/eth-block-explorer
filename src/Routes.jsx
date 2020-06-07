import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Blocks from './pages/Blocks';
import BlockInfo from './pages/BlockInfo';
import Transactions from './pages/Transactions';
import TransactionInfo from './pages/TransactionInfo';

const Routes = () => (
  <Switch>
    <Route exact path={['/']} component={Blocks} />
    {/* <Route path="/block/:id/:hash" component={TransactionInfo} /> */}
    <Route path="/block/:id" component={BlockInfo} />
    <Route path="/transactions/:id" component={Transactions} />
    <Route path="/transaction/:hash" component={TransactionInfo} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
