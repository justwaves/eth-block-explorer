import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionByHash } from 'redux/modules/transactions';
import TransactionInfo from 'components/transactions/TransactionInfo';

const TransactionInfoContainer = () => {
  const { hash } = useParams();
  const dispatch = useDispatch();

  const {
    transaction,
    error,
    transactionLoading,
    transactionsView,
  } = useSelector(({ transactions, loading, ui }) => ({
    transaction: transactions.transaction,
    error: transactions.error,
    transactionLoading: loading['transactions/GET_TRANSACTION_BY_HASH'],
    transactionsView: ui.transactionsView,
  }));

  useEffect(() => {
    dispatch(getTransactionByHash({ hash }));
  }, [dispatch, hash]);

  if (!transactionsView) {
    return null;
  }

  return (
    <div>
      <TransactionInfo
        loading={transactionLoading}
        error={error}
        transaction={transaction}
      />
    </div>
  );
};

export default TransactionInfoContainer;
