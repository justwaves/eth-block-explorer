import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put, call } from 'redux-saga/effects';
import { createRequestActionTypes } from '../../lib/createRequest';
import { startLoading, finishLoading } from './loading';
import web3 from '../../lib/web3API';

const SET_TRANSACTION_LIST = 'transactions/SET_TRANSACTION_LIST';

const UNLOAD_TRANSACTION_LIST = 'transactions/UNLOAD_TRANSACTION_LIST';

const [
  GET_TRANSACTION_BY_HASH,
  GET_TRANSACTION_BY_HASH_SUCCESS,
  GET_TRANSACTION_BY_HASH_FAILURE,
] = createRequestActionTypes('transactions/GET_TRANSACTION_BY_HASH');

export const setTransactionList = createAction(
  SET_TRANSACTION_LIST,
  ({ transactionList }) => ({ transactionList }),
);

export const unloadTransactionList = createAction(UNLOAD_TRANSACTION_LIST);

export const getTransactionByHash = createAction(
  GET_TRANSACTION_BY_HASH,
  ({ hash }) => ({ hash }),
);

const getTransactionByHashSaga = () => {
  return function* (action) {
    const { hash } = action.payload;
    try {
      yield put(startLoading(GET_TRANSACTION_BY_HASH));

      const transaction = yield call(web3.eth.getTransaction, hash);

      yield put({
        type: GET_TRANSACTION_BY_HASH_SUCCESS,
        payload: {
          transaction,
        },
      });
    } catch (e) {
      yield put({
        type: GET_TRANSACTION_BY_HASH_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(GET_TRANSACTION_BY_HASH));
  };
};

export function* transactionsSaga() {
  yield takeLatest(GET_TRANSACTION_BY_HASH, getTransactionByHashSaga());
}

const initialState = {
  transactionList: [],
  transaction: null,
  error: null,
};

const transactions = handleActions(
  {
    [SET_TRANSACTION_LIST]: (state, { payload: { transactionList } }) => ({
      ...state,
      transactionList,
    }),
    [GET_TRANSACTION_BY_HASH_SUCCESS]: (
      state,
      { payload: { transaction } },
    ) => ({
      ...state,
      transaction,
    }),
    [GET_TRANSACTION_BY_HASH_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [UNLOAD_TRANSACTION_LIST]: () => initialState,
  },
  initialState,
);

export default transactions;
