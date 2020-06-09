import { createAction, handleActions } from 'redux-actions';

const SHOW_TRANSACTIONS = 'ui/SHOW_TRANSACTIONS';
const HIDE_TRANSACTIONS = 'ui/HIDE_TRANSACTIONS';

export const showTransactions = createAction(SHOW_TRANSACTIONS);

export const hideTransactions = createAction(HIDE_TRANSACTIONS);

const initialState = {
  transactionsView: false,
};

const ui = handleActions(
  {
    [SHOW_TRANSACTIONS]: state => ({
      ...state,
      transactionsView: true,
    }),
    [HIDE_TRANSACTIONS]: state => ({
      ...state,
      transactionsView: false,
    }),
  },
  initialState,
);

export default ui;
