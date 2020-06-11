import React from 'react';
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import PageLayout from 'components/layouts/PageLayout';
import Block from 'containers/blocks/BlocksContainer';
import BlockInfo from 'containers/blocks/BlockInfoContainer';
import Transactions from 'containers/transactions/TransactionsContainer';
import TransactionInfo from 'containers/transactions/TransactionInfoContainer';
import SearchModal from 'components/search/SearchModal';
import { getCryptocurrencyInfo } from 'lib/api/block';

const Main = () => {
  const { id, hash } = useParams();
  // const { transactionsView } = useSelector(({ ui }) => ({
  //   transactionsView: ui.transactionsView,
  // }));

  const post = async () => {
    const {
      data: { data: cryptocurrencyInfo },
    } = await getCryptocurrencyInfo();

    console.log('post: ', cryptocurrencyInfo[1]);
  };
  post();

  return (
    <PageLayout>
      <SearchModal />
      <Block />
      {id && (
        <>
          <BlockInfo />
          <Transactions />
        </>
      )}
      {/* {hash && transactionsView && <TransactionInfo />} */}
      {hash && <TransactionInfo />}
    </PageLayout>
  );
};

export default Main;
