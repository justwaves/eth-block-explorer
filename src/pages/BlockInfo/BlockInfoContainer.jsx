import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlockInfoPresenter from './BlockInfoPresenter';
import { getBlockById } from '../../redux/modules/blocks';

const BlockInfoContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { block, error, blockLoading } = useSelector(({ blocks, loading }) => ({
    block: blocks.block,
    error: blocks.error,
    blockLoading: loading['blocks/GET_BLOCK_BY_ID'],
  }));

  useEffect(() => {
    dispatch(getBlockById({ id }));
  }, [dispatch, id]);

  return (
    <BlockInfoPresenter block={block} error={error} loading={blockLoading} />
  );
};

export default BlockInfoContainer;
