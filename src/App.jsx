import React from 'react';
import { Helmet } from 'react-helmet-async';
import Routes from './Routes';

const App = () => (
  <>
    <Helmet>
      <title>Block Explorer</title>
    </Helmet>
    <Routes />
  </>
);

export default App;
