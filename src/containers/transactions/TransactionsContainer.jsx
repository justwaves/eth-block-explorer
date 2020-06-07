import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlockById } from 'redux/modules/blocks';
import Transactions from 'components/transactions/Transactions';

const TransactionsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { transactionList, error, transactionListLoading } = useSelector(
    ({ transactions, loading }) => ({
      transactionList: transactions.transactionList,
      error: transactions.error,
      transactionListLoading: loading['blocks/GET_BLOCK_BY_ID'],
    }),
  );

  useEffect(() => {
    dispatch(getBlockById({ id }));
  }, [dispatch, id]);

  return (
    <Transactions
      transactionList={transactionList}
      error={error}
      loading={transactionListLoading}
      id={id}
    />
  );
};

export default TransactionsContainer;
