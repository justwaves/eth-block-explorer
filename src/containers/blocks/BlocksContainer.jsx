import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import web3 from 'lib/web3API';
import {
  getLastBlockNumber,
  getBlockList,
  updateBlockList,
} from 'redux/modules/blocks';
import { hideTransactions } from 'redux/modules/ui';
import Blocks from 'components/blocks/Blocks';

const BlocksContainer = () => {
  const [checked, setChecked] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    lastBlockNumber,
    blockList,
    error,
    blocksLoading,
    lastBlockLoading,
    realtime,
    latestBlockNumber,
  } = useSelector(({ blocks, loading }) => ({
    lastBlockNumber: blocks.lastBlockNumber,
    blockList: blocks.blockList,
    error: blocks.error,
    realtime: blocks.realtime,
    lastBlockLoading: loading['blocks/GET_LAST_BLOCK_NUMBER'],
    blocksLoading: loading['blocks/GET_BLOCK_LIST'],
    latestBlockNumber: blocks.latestBlockNumber,
  }));
  const [refresh, setRefresh] = useState(0);
  const subscriptionRef = useRef();

  useEffect(() => {
    dispatch(getLastBlockNumber());
  }, [dispatch]);

  useEffect(() => {
    if (lastBlockNumber) {
      dispatch(
        getBlockList({
          startBlock: lastBlockNumber - 30,
          endBlock: lastBlockNumber,
        }),
      );
    }
  }, [dispatch, lastBlockNumber]);

  // Real Time 옵션 활성화
  useEffect(() => {
    if (checked && realtime && lastBlockNumber && !subscriptionRef.current) {
      try {
        const subscription = web3.eth.subscribe(
          'newBlockHeaders',
          async (err, newBlock) => {
            if (err) {
              console.log(err);
            }
            const newBlockNumber = newBlock.number;
            dispatch(updateBlockList({ newBlockNumber }));
          },
        );
        subscriptionRef.current = subscription;
      } catch (err) {
        console.log(err);
      }
    }
  }, [dispatch, lastBlockNumber, realtime, checked]);

  useEffect(() => {
    if (!checked && subscriptionRef.current) {
      subscriptionRef.current.unsubscribe(err => {
        if (err) {
          console.log(err);
        }
      });
      subscriptionRef.current = null;
    }
  }, [checked]);

  useEffect(() => {
    setRefresh(r => r + 1);
  }, [blockList]);

  const closeTransactions = useCallback(() => {
    dispatch(hideTransactions());
  }, [dispatch]);

  const onRealTime = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <Blocks
      blockList={blockList}
      error={error}
      lastBlockLoading={lastBlockLoading}
      blocksLoading={blocksLoading}
      id={id}
      closeTransactions={closeTransactions}
      onRealTime={onRealTime}
      checked={checked}
      refresh={refresh}
      latestBlockNumber={latestBlockNumber}
    />
  );
};

export default BlocksContainer;
