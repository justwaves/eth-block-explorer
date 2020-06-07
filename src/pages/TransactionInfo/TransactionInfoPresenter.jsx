import React from 'react';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';

const Wrapper = styled.div``;

const TransactionInfoPresenter = ({ loading, error, transaction }) => {
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
      {transaction && (
        <>
          <div>{transaction.blockNumber}</div>
          <div>{transaction.hash}</div>
        </>
      )}
    </Wrapper>
  );
};

export default TransactionInfoPresenter;
