import React from 'react';
import styled, { css } from 'styled-components';
import MarketData from './MarketData';
import EthereumGraph from './EthereumGraph';
import EthereumInfoSkeleton from './EthereumInfoSkeleton';

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

const EthereumInfo = ({
  loading,
  error,
  ethInfo,
  blockList,
  totalDifficulty,
  totalGasUsed,
  averageDifficulty,
  averageGasUsed,
}) => {
  if (loading) {
    return <EthereumInfoSkeleton />;
  }

  if (error) {
    return (
      <Wrapper>
        {blockList && (
          <Content>
            <EthereumGraph blockList={blockList} />
            {totalDifficulty &&
              totalGasUsed &&
              averageDifficulty &&
              averageGasUsed && (
                <MarketData
                  ethInfo={{
                    total_supply: 'error',
                    quote: {
                      KRW: {
                        price: 'error',
                        volume_24h: 'error',
                        market_cap: 'error',
                      },
                    },
                  }}
                  totalDifficulty={totalDifficulty}
                  totalGasUsed={totalGasUsed}
                  averageDifficulty={averageDifficulty}
                  averageGasUsed={averageGasUsed}
                />
              )}
          </Content>
        )}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Content>
        {blockList && <EthereumGraph blockList={blockList} />}
        {ethInfo &&
          totalDifficulty &&
          totalGasUsed &&
          averageDifficulty &&
          averageGasUsed && (
            <MarketData
              ethInfo={ethInfo}
              totalDifficulty={totalDifficulty}
              totalGasUsed={totalGasUsed}
              averageDifficulty={averageDifficulty}
              averageGasUsed={averageGasUsed}
            />
          )}
      </Content>
    </Wrapper>
  );
};

export default React.memo(EthereumInfo);
