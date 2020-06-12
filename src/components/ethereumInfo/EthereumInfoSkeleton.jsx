import React from 'react';
import styled from 'styled-components';
import { Ethereum } from 'components/common/Icons';
import { Link } from 'react-router-dom';
import range from 'lodash.range';

const Wrapper = styled.div`
  min-width: ${props => props.theme.width.content};
  margin-right: 4.5rem;
  position: relative;
  width: 58.5rem;
`;

const Content = styled.div`
  min-height: 44.75rem;
`;

const EthereumGraphWrapper = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: default;
`;

const EthInfoHeader = styled.div`
  display: flex;
  align-items: center;
`;

const IconCotainer = styled.div``;

const EthName = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-left: 1rem;
`;

const LatestBlocks = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: 500;
  color: ${props => props.theme.colors.gray[1]};
`;

const GraphWrapper = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-right: 1rem;
`;

const Item = styled.div`
  width: 0.75rem;
  background-color: ${props => props.theme.colors.gray[5]};
  border-radius: 4px 4px 0 0;
  position: relative;
  height: 7rem;
`;

const MarketDataWrapper = styled.div`
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
  background-color: ${props => props.theme.colors.gray[5]};
  width: 9rem;
`;

const NameAndValue = ({ name }) => (
  <NameAndValueWrapper>
    <Name>{name}</Name>
    <Value />
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

const MarketDataContent = styled.div``;

const DataViewer = ({ title, children }) => (
  <DataWrapper>
    <Title>{title}</Title>
    <Content>{children}</Content>
  </DataWrapper>
);

const GraphItem = () => {
  return (
    <ItemWrapper>
      <StyledLink>
        <Item />
      </StyledLink>
    </ItemWrapper>
  );
};

const EthereumInfoSkeleton = () => {
  const rangeA = range(0, 30);
  return (
    <Wrapper>
      <MarketDataContent>
        <EthereumGraphWrapper>
          <EthInfoHeader>
            <IconCotainer>
              <Ethereum size={48} />
            </IconCotainer>
            <EthName>Ethereum Explorer</EthName>
          </EthInfoHeader>
          <LatestBlocks>LASTEST 30 BLOCKS AND TRANSACTIONS COUNT</LatestBlocks>
          <GraphWrapper>
            {rangeA.map(item => (
              <GraphItem item={item} />
            ))}
          </GraphWrapper>
        </EthereumGraphWrapper>

        <MarketDataWrapper>
          <DataViewer title="Market & Block Data (by CoinMarketCap)">
            <NameAndValue name="Price" />
            <NameAndValue name="Market Cap" />
            <NameAndValue name="Total Supply" />
            <NameAndValue name="Volume 24h" />
          </DataViewer>
          <DataViewer title="Stats for the last 30 blocks">
            <NameAndValue name="Total Difficulty" />
            <NameAndValue name="Avarage Difficulty" />
            <NameAndValue name="Total Gas Used" />
            <NameAndValue name="Avarage Gas Used" />
          </DataViewer>
        </MarketDataWrapper>
      </MarketDataContent>
    </Wrapper>
  );
};

export default EthereumInfoSkeleton;
