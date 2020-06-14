import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset}

  body {
    font-family:"Roboto", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    min-height: 100%;
    min-width: 360px; 
    background-color: ${props => props.theme.colors.bg};
  }

  * {
    box-sizing: inherit;
  }

  input, button, textarea {
    font-family: inherit;
  }

  html, body, #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  input:focus{
    outline:none;
  }

  button:focus {
    outline: 0;
  }
`;
