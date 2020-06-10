import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlockById } from 'redux/modules/blocks';
import { showTransactions } from 'redux/modules/ui';
import BlockInfo from 'components/blocks/BlockInfo';
import { unloadTransactionList } from 'redux/modules/transactions';

const BlockInfoContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { block, error, blockLoading, blocksLoading } = useSelector(
    ({ blocks, loading }) => ({
      block: blocks.block,
      error: blocks.error,
      blockLoading: loading['blocks/GET_BLOCK_BY_ID'],
      blocksLoading: loading['blocks/GET_BLOCK_LIST'],
    }),
  );

  useEffect(() => {
    dispatch(getBlockById({ id }));
    return () => {
      dispatch(unloadTransactionList());
    };
  }, [dispatch, id]);

  const viewTransactions = useCallback(() => {
    dispatch(showTransactions());
  }, [dispatch]);

  return (
    <BlockInfo
      block={block}
      error={error}
      loading={blockLoading}
      viewTransactions={viewTransactions}
      blocksLoading={blocksLoading}
    />
  );
};

export default BlockInfoContainer;
