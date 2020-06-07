import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import loading from './modules/loading';
import blocks, { blocksSaga } from './modules/blocks';
import transactions, { transactionsSaga } from './modules/transactions';

const env = process.env.NODE_ENV;

const rootReducer = combineReducers({
  loading,
  blocks,
  transactions,
});

export function* rootSaga() {
  yield all([blocksSaga(), transactionsSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (env === 'development') {
  // const { createLogger } = require("redux-logger");
  // const logger = createLogger();
  // middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
