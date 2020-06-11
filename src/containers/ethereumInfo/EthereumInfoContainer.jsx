import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EthereumInfo from 'components/ethereumInfo/EthereumInfo';
// import { getEthMarketInfo } from 'redux/modules/eth';

const EthereumInfoContainer = () => {
  const dispatch = useDispatch();
  const { ethInfo, blockList, error, ethLoading } = useSelector(
    ({ eth, blocks, loading }) => ({
      ethInfo: eth.ethInfo,
      error: eth.error,
      ethLoading: loading['eth/GET_ETH_MARKET_INFO'],
      blockList: blocks.blockList,
    }),
  );

  useEffect(() => {
    // dispatch(getEthMarketInfo());
  }, [dispatch]);

  return (
    <EthereumInfo
      ethInfo={ethInfo}
      blockList={blockList}
      loading={ethLoading}
      error={error}
    />
  );
};

export default EthereumInfoContainer;
