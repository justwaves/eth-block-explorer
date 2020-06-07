import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionByHash } from 'redux/modules/transactions';
import TransactionInfo from 'components/transactions/TransactionInfo';

const TransactionInfoContainer = () => {
  const { hash } = useParams();
  const dispatch = useDispatch();

  const { transaction, error, transactionLoading } = useSelector(
    ({ transactions, loading }) => ({
      transaction: transactions.transaction,
      error: transactions.error,
      transactionLoading: loading['transactions/GET_TRANSACTION_BY_HASH'],
    }),
  );

  useEffect(() => {
    dispatch(getTransactionByHash({ hash }));
  }, [dispatch, hash]);

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
