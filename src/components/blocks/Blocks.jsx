import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Spinner from 'components/common/Spinner';
import ListLayout from 'components/layouts/ListLayout';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ItemWrapper = styled.div`
  background-color: white;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:first-child {
      margin-bottom: 1.25rem;
    }
  }
`;

const BlockNumber = styled.div`
  color: ${props => props.theme.colors.primary[2]};
  font-weight: 500;
  font-size: 1.25rem;
`;

const Miner = styled.div``;

const Txns = styled.div``;

const Time = styled.div`
  color: ${props => props.theme.colors.gray[1]};
`;

const BlockItem = ({ item }) => {
  return (
    <StyledLink to={`/block/${item.number}`}>
      <ItemWrapper>
        <div>
          <BlockNumber>#{item.number}</BlockNumber>
          <Time>{item.timestamp}</Time>
        </div>
        <div>
          <Miner>Miner {item.miner.slice(0, 10)}...</Miner>
          <Txns>{item.transactions.length}txns</Txns>
        </div>
      </ItemWrapper>
    </StyledLink>
  );
};

const Blocks = ({ blockList, error, lastBlockLoading, blocksLoading }) => {
  if (lastBlockLoading || blocksLoading) {
    return (
      <ListLayout title="Latest Blocks">
        <Spinner />
      </ListLayout>
    );
  }

  if (error) {
    return <ListLayout title="Latest Blocks">error</ListLayout>;
  }

  return (
    <ListLayout title="Latest Blocks">
      {blockList.map(item => (
        <BlockItem item={item} key={item.number} />
      ))}
    </ListLayout>
  );
};

export default Blocks;
