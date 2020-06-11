import { createAction, handleActions } from 'redux-actions';

const SHOW_TRANSACTIONS = 'ui/SHOW_TRANSACTIONS';
const HIDE_TRANSACTIONS = 'ui/HIDE_TRANSACTIONS';
const SHOW_MODAL = 'ui/SHOW_MODAL';
const HIDE_MODAL = 'ui/HIDE_MODAL';

export const showTransactions = createAction(SHOW_TRANSACTIONS);

export const hideTransactions = createAction(HIDE_TRANSACTIONS);

export const showModal = createAction(SHOW_MODAL, content => content);

export const hideModal = createAction(HIDE_MODAL);

const initialState = {
  transactionsView: false,
  modal: null,
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
    [SHOW_MODAL]: (state, { payload: content }) => ({
      ...state,
      modal: content,
    }),
    [HIDE_MODAL]: state => ({
      ...state,
      modal: null,
    }),
  },
  initialState,
);

export default ui;
