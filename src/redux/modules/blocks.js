import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put, call, select, delay } from 'redux-saga/effects';
import { createRequestActionTypes } from '../../lib/createRequest';
import { startLoading, finishLoading } from './loading';
import web3 from '../../lib/web3API';
import { fetchBlocks } from '../../lib/utils';
import { setTransactionList } from './transactions';

const [
  GET_LAST_BLOCK_NUMBER,
  GET_LAST_BLOCK_NUMBER_SUCCESS,
  GET_LAST_BLOCK_NUMBER_FAILURE,
] = createRequestActionTypes('blocks/GET_LAST_BLOCK_NUMBER');

const SET_LAST_BLOCK_NUMBER = 'blocks/SET_LAST_BLOCK_NUMBER';
const SET_LATEST_BLOCK_NUMBER = 'blocks/SET_LATEST_BLOCK_NUMBER';

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

const [
  UPDATE_BLOCK_LIST,
  UPDATE_BLOCK_LIST_SUCCESS,
  UPDATE_BLOCK_LIST_FAILURE,
] = createRequestActionTypes('blocks/UPDATE_BLOCK_LIST');

export const getLastBlockNumber = createAction(GET_LAST_BLOCK_NUMBER);
export const getBlockList = createAction(
  GET_BLOCK_LIST,
  ({ startBlock, endBlock }) => ({ startBlock, endBlock }),
);
export const getBlockById = createAction(GET_BLOCK_BY_ID, ({ id }) => ({ id }));
export const setLastBlockNumber = createAction(
  SET_LAST_BLOCK_NUMBER,
  ({ lastBlockNumber }) => ({
    lastBlockNumber,
  }),
);
export const setLatestBlockNumber = createAction(
  SET_LAST_BLOCK_NUMBER,
  ({ latestBlockNumber }) => ({
    latestBlockNumber,
  }),
);

export const updateBlockList = createAction(
  UPDATE_BLOCK_LIST,
  ({ newBlockNumber }) => ({ newBlockNumber }),
);

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

      const block = yield call(web3.eth.getBlock, id, true);

      if (block) {
        yield put({
          type: GET_BLOCK_BY_ID_SUCCESS,
          payload: {
            block,
          },
        });

        const transactionList = block.transactions.filter(
          transaction => transaction.value > 0 && transaction.to !== null,
        );

        yield put(setTransactionList({ transactionList }));
      }
    } catch (e) {
      console.log(e);
      yield put({
        type: GET_BLOCK_BY_ID_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(GET_BLOCK_BY_ID));
  };
};

const updateBlockListSaga = () => {
  return function* (action) {
    const { newBlockNumber } = action.payload;
    try {
      yield put(startLoading(UPDATE_BLOCK_LIST));

      const { blockList } = yield select(state => state.blocks);
      yield delay(3000);

      if (blockList && blockList.length !== 0 && blockList[0].number) {
        console.log(`Fetch ${blockList[0].number + 1} ~ ${newBlockNumber}`);
        if (blockList[0].number + 1 < newBlockNumber) {
          const latestBlockList = yield call(
            fetchBlocks,
            blockList[0].number + 1,
            newBlockNumber,
          );
          latestBlockList.filter(block => block !== null);
          console.log(...latestBlockList);

          yield delay(2000);
          const newBlockList = blockList
            .reverse()
            .concat(latestBlockList)
            .reverse();

          yield put({
            type: UPDATE_BLOCK_LIST_SUCCESS,
            payload: {
              newBlockList,
            },
          });
          yield put({
            type: SET_LATEST_BLOCK_NUMBER,
            payload: {
              latestBlockNumber: latestBlockList.reverse()[0].number,
            },
          });
        } else if (blockList[0].number + 1 >= newBlockNumber) {
          console.log(
            `Can't fetch ==> ${blockList[0].number + 1} ~ ${newBlockNumber}`,
          );
        }
      }

      // if (!blockList[0] || !blockList[1]) {
      //   const { blockList: currentBlockList } = yield select(
      //     state => state.blocks,
      //   );
      //   currentBlockList.filter(block => block !== null);
      //   console.log('currentBlockList ==', currentBlockList);
      //   yield delay(3000);
      //   yield put(getLastBlockNumber());
      // }
    } catch (e) {
      console.log(e);
      yield put({
        type: UPDATE_BLOCK_LIST_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(UPDATE_BLOCK_LIST));
  };
};

export function* blocksSaga() {
  yield takeLatest(GET_LAST_BLOCK_NUMBER, getLastBlockNumberSaga());
  yield takeLatest(GET_BLOCK_LIST, getBlockListSaga());
  yield takeLatest(GET_BLOCK_BY_ID, getBlockByIdSaga());
  yield takeLatest(UPDATE_BLOCK_LIST, updateBlockListSaga());
}

const initialState = {
  lastBlockNumber: null,
  blockList: [],
  block: null,
  transactionList: [],
  error: null,
  realtime: true,
  newBlockNumber: null,
  latestBlockNumber: null,
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
    [SET_LAST_BLOCK_NUMBER]: (state, { payload: { lastBlockNumber } }) => ({
      ...state,
      lastBlockNumber,
    }),
    [UPDATE_BLOCK_LIST_SUCCESS]: (state, { payload: { newBlockList } }) => ({
      ...state,
      blockList: newBlockList,
    }),
    [UPDATE_BLOCK_LIST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [SET_LATEST_BLOCK_NUMBER]: (state, { payload: { latestBlockNumber } }) => ({
      ...state,
      latestBlockNumber,
    }),
  },
  initialState,
);

export default blocks;
