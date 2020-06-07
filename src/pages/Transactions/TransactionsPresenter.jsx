import React from 'react';
import styled from 'styled-components';
import TagLink from '../../components/TagLink';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import { toEther } from '../../lib/utils';

const Wrapper = styled.div``;

const Text = styled.div``;

const Content = styled.div``;

const TransactionsPresenter = ({ failed, loading, transactionList, id }) => {
  if (loading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }
  if (failed) {
    return <Wrapper>failed</Wrapper>;
  }

  return (
    <>
      <div>
        <Text>
          {id === '-1'
            ? 'Latest Transactions'
            : `Transactions from block ${id}`}
        </Text>
      </div>
      <Pagination items={transactionList}>
        {paginatedItems =>
          paginatedItems.map(transaction => (
            <Content key={transaction.hash}>
              <TagLink
                shorten
                text={transaction.hash}
                location={`/transaction/${transaction.hash}`}
              />
              <div className="trans-details">
                <Text>From {transaction.from}</Text>
              </div>
              <div className="trans-details">
                <Text>To {transaction.to}</Text>
              </div>
              <Text>{`$ ${toEther(transaction.value).toFixed(2)}`}</Text>
            </Content>
          ))
        }
      </Pagination>
    </>
  );
};

export default TransactionsPresenter;
