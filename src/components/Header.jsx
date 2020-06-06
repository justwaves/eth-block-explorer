import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 3rem;
  border-bottom: 1px solid grey;
  line-height: 3rem;

  a {
    margin: 1.5rem;
  }
`;

const Header = () => (
  <Wrapper>
    <a href="/blocks">Blocks</a>
    <a href="/block/10210455">Block Detail</a>
    <a href="/transactions/10210455">Transactions</a>
    <a href="/transaction/0x1096bd073deffddd6721e76da00eca41b01af72a121ca5b8414abcfc72544dba">
      Transaction Detail
    </a>
  </Wrapper>
);

export default Header;
