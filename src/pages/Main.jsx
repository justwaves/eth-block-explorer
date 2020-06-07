import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from 'components/layouts/PageLayout';
import Block from 'containers/blocks/BlocksContainer';
import BlockInfo from 'containers/blocks/BlockInfoContainer';
import Transactions from 'containers/transactions/TransactionsContainer';
import TransactionInfo from 'containers/transactions/TransactionInfoContainer';

const Main = () => {
  const { id, hash } = useParams();
  console.log('id: ', id);
  console.log('hash: ', hash);
  return (
    <PageLayout>
      <Block />
      {id && (
        <>
          <BlockInfo />
          <Transactions />
        </>
      )}
      {hash && <TransactionInfo />}
    </PageLayout>
  );
};

export default Main;
