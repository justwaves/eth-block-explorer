import React from 'react';
import { Helmet } from 'react-helmet-async';
import Routes from './Routes';
import Header from './components/Header';

const App = () => (
  <>
    <Helmet>
      <title>Block Explorer</title>
    </Helmet>
    <Header />
    <Routes />
  </>
);

export default App;
