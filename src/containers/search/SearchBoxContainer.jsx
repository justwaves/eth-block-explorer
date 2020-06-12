import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from 'redux/modules/ui';
import { useHistory } from 'react-router';
import SearchBox from 'components/search/SearchBox';

const SearchBoxContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { latestBlockNumber, lastBlockNumber } = useSelector(({ blocks }) => ({
    latestBlockNumber: blocks.latestBlockNumber,
    lastBlockNumber: blocks.lastBlockNumber,
  }));

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const parsedValue = parseInt(inputValue, 10);
      console.log(parsedValue);
      if (
        parsedValue >= 0 &&
        (parsedValue <= latestBlockNumber || parsedValue <= lastBlockNumber)
      ) {
        history.push(`/block/${parsedValue}`);
        dispatch(hideModal());
      } else {
        setInputValue('');
        setShowError(parsedValue);
      }
    },
    [dispatch, history, latestBlockNumber, inputValue, lastBlockNumber],
  );

  const onChange = useCallback(e => {
    if (!Number(e.target.value)) {
      return;
    }
    setInputValue(e.target.value);
  }, []);

  return (
    <SearchBox
      onSubmit={onSubmit}
      inputValue={inputValue}
      onChange={onChange}
      showError={showError}
    />
  );
};

export default SearchBoxContainer;
