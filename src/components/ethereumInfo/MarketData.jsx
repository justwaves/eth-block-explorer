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
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
`;

const Name = styled.div`
  color: ${props => props.theme.colors.gray[1]};
  font-weight: 600;
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

const MarketData = ({ ethInfo }) => {
  console.log(ethInfo);
  // const {
  //   total_supply: totalSupply,
  //   quote: {
  //     KRW: {
  //       price,
  //       volume_24h: volume24h,
  //       percent_change_1h: percentChange1h,
  //       percent_change_24h: percentChange24h,
  //       percent_change_7d: percentChange7d,
  //       market_cap: marketCap,
  //       last_updated: lastUpdated,
  //     },
  //   },
  // } = ethInfo;
  const totalSupply = 123456;
  let price = 295287;
  price = (price - (price % 10)).toLocaleString();
  let volume24h = 111302002;
  volume24h = volume24h.toLocaleString();
  const percentChange1h = 123456;
  const percentChange24h = 123456;
  const percentChange7d = 123456;
  let marketCap = 32866136021128;
  marketCap = (marketCap - (marketCap % 10)).toLocaleString();

  return (
    <Wrapper>
      <DataViewer title="Market & Block Data">
        <NameAndValue name="Price" value={`₩ ${price}`} />
        <NameAndValue name="Total Supply" value={totalSupply} />
        <NameAndValue name="Market Cap" value={`₩ ${marketCap}`} />
        <NameAndValue name="Volume 24h" value={volume24h} />
      </DataViewer>
      <DataViewer title="Stats for the last 30 blocks">
        <NameAndValue name="Total Difficulty" value={percentChange1h} />
        <NameAndValue name="Avarage Difficulty" value={percentChange24h} />
        <NameAndValue name="Total Gas Used" value={percentChange7d} />
        <NameAndValue name="Avarage Gas Used" value={percentChange7d} />
      </DataViewer>
    </Wrapper>
  );
};

export default MarketData;
