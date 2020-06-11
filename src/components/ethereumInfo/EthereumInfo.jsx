import React from 'react';
import styled, { css } from 'styled-components';
import Spinner from 'components/common/Spinner';
import MarketData from './MarketData';
import EthereumGraph from './EthereumGraph';

const Wrapper = styled.div`
  min-width: ${props => props.theme.width.content};
  margin-right: 4.5rem;
  position: relative;
  width: 58.5rem;
`;

const Content = styled.div`
  min-height: 44.75rem;

  ${props =>
    props.loading &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const EthereumInfo = ({ loading, error, ethInfo, blockList }) => {
  if (loading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  if (error) {
    return <Wrapper>error</Wrapper>;
  }

  return (
    <Wrapper>
      <Content>
        {blockList && <EthereumGraph blockList={blockList} />}
        <MarketData />
        {/* {ethInfo && <MarketData ethInfo={ethInfo} />} */}
      </Content>
    </Wrapper>
  );
};

export default React.memo(EthereumInfo);
