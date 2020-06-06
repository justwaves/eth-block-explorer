import Web3 from 'web3';

// metamask 설치되어 있으면 web3 object 리턴
const getInjectedProvider = () => {
  if (window.ethereum) {
    return window.ethereum;
  }
  if (window.web3 && window.web3.currentProvider) {
    return window.web3.currentProvider;
  }
  return null;
};

const web3 = new Web3(
  getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT,
);

export default web3;
