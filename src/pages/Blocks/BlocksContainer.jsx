import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlocksPresenter from './BlocksPresenter';
import { getLastBlockNumber, getBlockList } from '../../redux/modules/blocks';

const BlocksContainer = () => {
  const dispatch = useDispatch();
  const {
    lastBlockNumber,
    blockList,
    error,
    blocksLoading,
    lastBlockLoading,
  } = useSelector(({ blocks, loading }) => ({
    lastBlockNumber: blocks.lastBlockNumber,
    blockList: blocks.blockList,
    error: blocks.error,
    lastBlockLoading: loading['blocks/GET_LAST_BLOCK_NUMBER'],
    blocksLoading: loading['blocks/GET_BLOCK_LIST'],
  }));

  useEffect(() => {
    dispatch(getLastBlockNumber());
  }, [dispatch]);

  useEffect(() => {
    if (lastBlockNumber) {
      dispatch(
        getBlockList({
          startBlock: lastBlockNumber - 10,
          endBlock: lastBlockNumber,
        }),
      );
    }
  }, [dispatch, lastBlockNumber]);

  return (
    <BlocksPresenter
      blockList={blockList}
      error={error}
      lastBlockLoading={lastBlockLoading}
      blocksLoading={blocksLoading}
    />
  );
};

export default BlocksContainer;
