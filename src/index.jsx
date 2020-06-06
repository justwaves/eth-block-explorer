import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyles from './styles/globalStyle';
import theme from './styles/theme';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
);
