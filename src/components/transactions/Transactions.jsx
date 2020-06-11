import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Pagination from 'components/common/Pagination';
import { toEther, shortenAddress } from 'lib/utils';
import ContentLayout from 'components/layouts/ContentLayout';
import AddressWithIcon from 'components/common/AddressWithIcon';
import { Transaction } from 'components/common/Icons';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ItemWrapper = styled.div`
  background-color: white;
  margin-bottom: 0.75rem;
  padding: 1.25rem;
  border-radius: 0.25rem;
  box-shadow: ${props => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.colors.secondary[1]};
      color: white;
      box-shadow: none;
    `}

  > div {
    display: flex;
    align-items: center;

    &:first-child {
      justify-content: space-between;
      margin-bottom: 1rem;
    }
  }
`;

const TxHash = styled.div`
  color: ${props => props.theme.colors.secondary[1]};
  font-weight: 500;
  font-size: 1.25rem;

  ${props =>
    props.selected &&
    css`
      color: white;
    `}

  svg {
    margin-right: 0.5rem;
  }
`;

const Time = styled.div`
  color: ${props => props.theme.colors.gray[1]};

  ${props =>
    props.selected &&
    css`
      color: white;
    `}
`;

const FromTo = styled.div`
  p {
    margin: 0 0.5rem;
    color: ${props => props.theme.colors.gray[1]};

    ${props =>
      props.selected &&
      css`
        color: white;
      `}
  }
`;

const TxItem = ({ item, hash }) => {
  const selected = hash === item.hash;
  const { hash: itemHash, from, to, value, blockNumber } = item;

  const shortenHash = shortenAddress(itemHash);

  return (
    <StyledLink to={`/block/${blockNumber}/${itemHash}`}>
      <ItemWrapper selected={selected}>
        <div>
          <TxHash selected={selected}>
            <Transaction size={16} />
            {shortenHash}
          </TxHash>
          <Time selected={selected}>{toEther(value).toFixed(4)} Eth</Time>
        </div>
        <FromTo selected={selected}>
          <p>from</p>
          <AddressWithIcon address={from} selected={selected} />
          <p>to</p>
          <AddressWithIcon address={to} selected={selected} />
        </FromTo>
      </ItemWrapper>
    </StyledLink>
  );
};

const Transactions = ({ error, loading, transactionList, id, hash }) => {
  return (
    <ContentLayout
      loading={loading}
      error={error}
      title={`Transactions from #${id}`}
      blockNumber={id}
    >
      <Pagination items={transactionList}>
        {paginatedItems =>
          paginatedItems.map(transaction => (
            <TxItem key={transaction.hash} item={transaction} hash={hash} />
          ))
        }
      </Pagination>
    </ContentLayout>
  );
};

export default Transactions;
