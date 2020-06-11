import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from 'components/layouts/PageLayout';
import Block from 'containers/blocks/BlocksContainer';
import BlockInfo from 'containers/blocks/BlockInfoContainer';
import Transactions from 'containers/transactions/TransactionsContainer';
import TransactionInfoContainer from 'containers/transactions/TransactionInfoContainer';
import SearchModal from 'components/search/SearchModal';
import EthereumInfo from 'containers/ethereumInfo/EthereumInfoContainer';

const Main = () => {
  const { id, hash } = useParams();
  return (
    <PageLayout>
      <SearchModal />
      {id ? (
        <>
          <Block />
          <BlockInfo />
          <Transactions />
        </>
      ) : (
        <>
          <Block />
          <EthereumInfo />
        </>
      )}
      {hash && <TransactionInfoContainer />}
    </PageLayout>
  );
};

export default Main;
