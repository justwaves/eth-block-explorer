import { createAction, handleActions } from 'redux-actions';
// import { takeLatest, put, call } from 'redux-saga/effects';
// import { createRequestActionTypes } from '../../lib/createRequest';
// import { startLoading, finishLoading } from './loading';
// import web3 from '../../lib/web3API';
// import { fetchBlocks } from '../../lib/utils';
// import { getBlockById } from './blocks';

const SET_TRANSACTION_LIST = 'transactions/SET_TRANSACTION_LIST';

// const [
//   GET_TRANSACTION_BY_HASH,
//   GET_TRANSACTION_BY_HASH_SUCCESS,
//   GET_TRANSACTION_BY_HASH_FAILURE,
// ] = createRequestActionTypes('transactions/GET_TRANSACTION_BY_HASH');

export const setTransactionList = createAction(
  SET_TRANSACTION_LIST,
  ({ transactionList }) => ({ transactionList }),
);

export function* transactionsSaga() {}

const initialState = {
  transactionList: [],
  error: null,
};

const transactions = handleActions(
  {
    [SET_TRANSACTION_LIST]: (state, { payload: { transactionList } }) => ({
      ...state,
      transactionList,
    }),
  },
  initialState,
);

export default transactions;
