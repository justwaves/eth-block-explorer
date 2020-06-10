import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlockById } from 'redux/modules/blocks';
import { unloadTransactionList } from 'redux/modules/transactions';
import Transactions from 'components/transactions/Transactions';

const TransactionsContainer = () => {
  const { id, hash } = useParams();
  const dispatch = useDispatch();
  const {
    transactionList,
    error,
    transactionListLoading,
    transactionsView,
  } = useSelector(({ transactions, loading, ui }) => ({
    transactionList: transactions.transactionList,
    error: transactions.error,
    transactionListLoading: loading['blocks/GET_BLOCK_BY_ID'],
    transactionsView: ui.transactionsView,
  }));

  useEffect(() => {
    dispatch(getBlockById({ id }));

    return () => {
      dispatch(unloadTransactionList());
    };
  }, [dispatch, id]);

  if (!transactionsView) {
    return null;
  }

  return (
    <Transactions
      transactionList={transactionList}
      error={error}
      loading={transactionListLoading}
      id={id}
      hash={hash}
    />
  );
};

export default TransactionsContainer;
