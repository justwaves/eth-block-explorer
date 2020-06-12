import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EthereumInfo from 'components/ethereumInfo/EthereumInfo';
import { getEthMarketInfo } from 'redux/modules/eth';

const EthereumInfoContainer = () => {
  const [totalDifficulty, setTotalDifficulty] = useState(null);
  const [totalGasUsed, setTotalGasUsed] = useState(null);
  const [averageDifficulty, setAverageDifficulty] = useState(null);
  const [averageGasUsed, setAverageGasUsed] = useState(null);

  const dispatch = useDispatch();
  const {
    ethInfo,
    blockList,
    error,
    ethLoading,
    blockListLoading,
    lastBlockLoading,
  } = useSelector(({ eth, blocks, loading }) => ({
    ethInfo: eth.ethInfo,
    error: eth.error,
    ethLoading: loading['eth/GET_ETH_MARKET_INFO'],
    blockListLoading: loading['blocks/GET_BLOCK_LIST'],
    lastBlockLoading: loading['blocks/GET_LAST_BLOCK_NUMBER'],
    blockList: blocks.blockList,
  }));

  useEffect(() => {
    // TODO: coin marketcap API
    dispatch(getEthMarketInfo());
  }, [dispatch]);

  useEffect(() => {
    if (blockList.length > 0) {
      let totDifficulty = blockList
        .slice(0, 30)
        .reduce(
          (total, currentBlock) => total + Number(currentBlock.difficulty),
          0,
        );
      let avgDifficulty = totDifficulty / blockList.length;
      avgDifficulty = Math.floor(avgDifficulty).toLocaleString();
      setAverageDifficulty(avgDifficulty);
      totDifficulty = totDifficulty.toLocaleString();
      setTotalDifficulty(totDifficulty);

      let totGasUsed = blockList
        .slice(0, 30)
        .reduce(
          (total, currentBlock) => total + Number(currentBlock.gasUsed),
          0,
        );
      let avgGasUsed = totGasUsed / blockList.length;
      avgGasUsed = Math.floor(avgGasUsed).toLocaleString();
      setAverageGasUsed(avgGasUsed);
      totGasUsed = totGasUsed.toLocaleString();
      setTotalGasUsed(totGasUsed);
    }
  }, [blockList]);

  return (
    <EthereumInfo
      ethInfo={ethInfo}
      blockList={blockList}
      loading={ethLoading || lastBlockLoading || blockListLoading}
      error={error}
      totalDifficulty={totalDifficulty}
      totalGasUsed={totalGasUsed}
      averageDifficulty={averageDifficulty}
      averageGasUsed={averageGasUsed}
    />
  );
};

export default React.memo(EthereumInfoContainer);
