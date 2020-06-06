import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put, call } from 'redux-saga/effects';
import { createRequestActionTypes } from '../../lib/createRequest';
import { startLoading, finishLoading } from './loading';
import web3 from '../../lib/web3API';
import { fetchBlocks } from '../../lib/utils';

const [
  GET_LAST_BLOCK_NUMBER,
  GET_LAST_BLOCK_NUMBER_SUCCESS,
  GET_LAST_BLOCK_NUMBER_FAILURE,
] = createRequestActionTypes('blocks/GET_LAST_BLOCK_NUMBER');

const [
  GET_BLOCK_LIST,
  GET_BLOCK_LIST_SUCCESS,
  GET_BLOCK_LIST_FAILURE,
] = createRequestActionTypes('blocks/GET_BLOCK_LIST');

const [
  GET_BLOCK_BY_ID,
  GET_BLOCK_BY_ID_SUCCESS,
  GET_BLOCK_BY_ID_FAILURE,
] = createRequestActionTypes('blocks/GET_BLOCK_BY_ID');

const getLastBlockNumberSaga = () => {
  return function* () {
    try {
      yield put(startLoading(GET_LAST_BLOCK_NUMBER));
      const lastBlockNumber = yield call(web3.eth.getBlockNumber);
      yield put({
        type: GET_LAST_BLOCK_NUMBER_SUCCESS,
        payload: {
          lastBlockNumber,
        },
      });
    } catch (e) {
      yield put({
        type: GET_LAST_BLOCK_NUMBER_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(GET_LAST_BLOCK_NUMBER));
  };
};

const getBlockListSaga = () => {
  return function* (action) {
    const { startBlock, endBlock } = action.payload;
    try {
      yield put(startLoading(GET_BLOCK_LIST));

      let blockList = yield call(fetchBlocks, startBlock, endBlock);
      blockList = blockList.reverse();

      yield put({
        type: GET_BLOCK_LIST_SUCCESS,
        payload: {
          blockList,
        },
      });
    } catch (e) {
      yield put({
        type: GET_BLOCK_LIST_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(GET_BLOCK_LIST));
  };
};

const getBlockByIdSaga = () => {
  return function* (action) {
    const { id } = action.payload;
    try {
      yield put(startLoading(GET_BLOCK_BY_ID));

      const block = yield call(web3.eth.getBlock, id);

      yield put({
        type: GET_BLOCK_BY_ID_SUCCESS,
        payload: {
          block,
        },
      });
    } catch (e) {
      yield put({
        type: GET_BLOCK_BY_ID_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(GET_BLOCK_BY_ID));
  };
};

export const getLastBlockNumber = createAction(GET_LAST_BLOCK_NUMBER);
export const getBlockList = createAction(
  GET_BLOCK_LIST,
  ({ startBlock, endBlock }) => ({ startBlock, endBlock }),
);
export const getBlockById = createAction(GET_BLOCK_BY_ID, ({ id }) => ({ id }));

export function* blocksSaga() {
  yield takeLatest(GET_LAST_BLOCK_NUMBER, getLastBlockNumberSaga());
  yield takeLatest(GET_BLOCK_LIST, getBlockListSaga());
  yield takeLatest(GET_BLOCK_BY_ID, getBlockByIdSaga());
}

const initialState = {
  lastBlockNumber: null,
  blockList: [],
  block: null,
  error: null,
};

const blocks = handleActions(
  {
    [GET_LAST_BLOCK_NUMBER_SUCCESS]: (
      state,
      { payload: { lastBlockNumber } },
    ) => ({
      ...state,
      lastBlockNumber,
    }),
    [GET_LAST_BLOCK_NUMBER_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [GET_BLOCK_LIST_SUCCESS]: (state, { payload: { blockList } }) => ({
      ...state,
      blockList,
    }),
    [GET_BLOCK_LIST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [GET_BLOCK_BY_ID_SUCCESS]: (state, { payload: { block } }) => ({
      ...state,
      block,
    }),
    [GET_BLOCK_BY_ID_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
  },
  initialState,
);

export default blocks;
