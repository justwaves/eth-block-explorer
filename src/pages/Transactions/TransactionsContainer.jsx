import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TransactionsPresenter from './TransactionsPresenter';
import { getBlockById } from '../../redux/modules/blocks';

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
    <TransactionsPresenter
      transactionList={transactionList}
      error={error}
      loading={transactionListLoading}
      id={id}
    />
  );
};

export default TransactionsContainer;
