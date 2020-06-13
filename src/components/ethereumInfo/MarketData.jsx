import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 20rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NameAndValueWrapper = styled.div`
  display: grid;
  margin-top: 1.75rem;
  grid-template-columns: 9rem 12rem;
  gap: 2rem;
`;

const Name = styled.div`
  color: ${props => props.theme.colors.gray[1]};
  font-weight: 500;
`;

const Value = styled.div`
  color: ${props => props.theme.colors.black[3]};
  font-weight: 500;
`;

const NameAndValue = ({ name, value }) => (
  <NameAndValueWrapper>
    <Name>{name}</Name>
    <Value>{value}</Value>
  </NameAndValueWrapper>
);

const DataWrapper = styled.div`
  margin-right: 1rem;
  width: 50%;

  & + & {
    margin-left: 5rem;
  }
`;

const Title = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.black[3]};
  font-weight: 500;
  margin-bottom: 3rem;
`;

const Content = styled.div``;

const DataViewer = ({ title, children }) => (
  <DataWrapper>
    <Title>{title}</Title>
    <Content>{children}</Content>
  </DataWrapper>
);

const MarketData = ({
  ethInfo,
  totalDifficulty,
  totalGasUsed,
  averageDifficulty,
  averageGasUsed,
  // totSupply = 111314473.374,
  // priceA = 282973.7019417429,
  // mCap = 31499068610336.35,
  // volume24 = 14786897539797.104,
}) => {
  // console.log(ethInfo);

  const {
    total_supply: totSupply,
    quote: {
      KRW: { price: priceA, volume_24h: volume24, market_cap: mCap },
    },
  } = ethInfo;

  const calculatedPrice = (priceA - (priceA % 10)).toLocaleString();
  const marketCap = (mCap - (mCap % 10)).toLocaleString();
  const totalSupply = Math.floor(totSupply).toLocaleString();
  const volume24h = Math.floor(volume24).toLocaleString();

  return (
    <Wrapper>
      <DataViewer title="Market & Block Data (by CoinMarketCap)">
        <NameAndValue name="Price" value={`₩ ${calculatedPrice}`} />
        <NameAndValue name="Market Cap" value={`₩ ${marketCap}`} />
        <NameAndValue name="Total Supply" value={totalSupply} />
        <NameAndValue name="Volume 24h" value={volume24h} />
      </DataViewer>
      <DataViewer title="Stats for the last 30 blocks">
        <NameAndValue name="Total Difficulty" value={totalDifficulty} />
        <NameAndValue name="Avarage Difficulty" value={averageDifficulty} />
        <NameAndValue name="Total Gas Used" value={totalGasUsed} />
        <NameAndValue name="Avarage Gas Used" value={averageGasUsed} />
      </DataViewer>
    </Wrapper>
  );
};

export default React.memo(MarketData);
