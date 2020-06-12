import { createAction, handleActions } from 'redux-actions';
import { createRequestActionTypes } from 'lib/createRequest';
import { takeLatest, put, call } from 'redux-saga/effects';
import { getCryptocurrencyInfo } from 'lib/api/block';
import { startLoading, finishLoading } from './loading';

const [
  GET_ETH_MARKET_INFO,
  GET_ETH_MARKET_INFO_SUCCESS,
  GET_ETH_MARKET_INFO_FAILURE,
] = createRequestActionTypes('eth/GET_ETH_MARKET_INFO');

export const getEthMarketInfo = createAction(GET_ETH_MARKET_INFO);

const getEthMarketInfoSaga = () => {
  return function* () {
    try {
      yield put(startLoading(GET_ETH_MARKET_INFO));

      const { data } = yield call(getCryptocurrencyInfo);
      const ethInfo = data.data[1];

      yield put({
        type: GET_ETH_MARKET_INFO_SUCCESS,
        payload: {
          ethInfo,
        },
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: GET_ETH_MARKET_INFO_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(GET_ETH_MARKET_INFO));
  };
};

export function* ethSaga() {
  yield takeLatest(GET_ETH_MARKET_INFO, getEthMarketInfoSaga());
}

const initialState = {
  ethInfo: null,
  error: null,
};

const eth = handleActions(
  {
    [GET_ETH_MARKET_INFO_SUCCESS]: (state, { payload: { ethInfo } }) => ({
      ...state,
      ethInfo,
    }),
    [GET_ETH_MARKET_INFO_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
  },
  initialState,
);

export default eth;
