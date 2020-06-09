import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Pagination from 'components/common/Pagination';
import ContentLayout from 'components/layouts/ContentLayout';
import AddressWithIcon from 'components/common/AddressWithIcon';
import FromNow from 'components/common/FromNow';
import Toggle from 'components/common/Toggle';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ItemWrapper = styled.div`
  background-color: white;
  margin-bottom: 0.75rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.colors.primary[1]};
      color: white;
      box-shadow: none;
    `}

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:first-child {
      margin-bottom: 1rem;
    }
  }
`;

const BlockNumber = styled.div`
  color: ${props => props.theme.colors.primary[1]};
  font-weight: 500;
  font-size: 1.25rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    fill: ${props => props.theme.colors.primary[2]};
  }

  ${props =>
    props.selected &&
    css`
      color: white;
    `}
`;

const Miner = styled.div`
  display: flex;
  align-items: center;
`;

const Txns = styled.div``;

const Timestamp = styled.div`
  color: ${props => props.theme.colors.gray[1]};

  ${props =>
    props.selected &&
    css`
      color: white;
    `}
`;

const BlockItem = React.memo(({ item, id, onClick }) => {
  const selected = parseInt(id, 10) === item.number;
  return (
    <StyledLink to={`/block/${item.number}`}>
      <ItemWrapper selected={selected} onClick={onClick}>
        <div>
          <BlockNumber selected={selected}>#{item.number}</BlockNumber>
          <Timestamp selected={selected}>
            <FromNow timestamp={item.timestamp} />
          </Timestamp>
        </div>
        <div>
          <Miner>
            <AddressWithIcon address={item.miner} selected={selected} />
          </Miner>
          <Txns>{item.transactions.length}txns</Txns>
        </div>
      </ItemWrapper>
    </StyledLink>
  );
});

const Blocks = ({
  id,
  blockList,
  error,
  lastBlockLoading,
  blocksLoading,
  closeTransactions,
  checked,
  onRealTime,
}) => {
  return (
    <ContentLayout
      title="Latest Blocks"
      loading={lastBlockLoading || blocksLoading}
      error={error}
      toggle={<Toggle checked={checked} onClick={onRealTime} />}
      toggleLabel="Real time"
    >
      <Pagination items={blockList}>
        {paginatedItems =>
          paginatedItems.map(block => (
            <BlockItem
              id={id}
              item={block}
              key={block.number}
              onClick={closeTransactions}
            />
          ))
        }
      </Pagination>
    </ContentLayout>
  );
};

export default React.memo(Blocks);
