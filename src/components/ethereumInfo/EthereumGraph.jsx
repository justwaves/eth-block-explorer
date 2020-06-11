import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Ethereum } from 'components/common/Icons';
import { Link } from 'react-router-dom';

const Wrapper = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const EthInfoHeader = styled.div`
  display: flex;
  align-items: center;
`;

const IconCotainer = styled.div``;

const EthName = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-left: 1rem;
`;

const LatestBlocks = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: 500;
  color: ${props => props.theme.colors.gray[1]};
`;

const GraphWrapper = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-right: 1rem;
`;

const Item = styled.div`
  width: 0.75rem;
  background-color: ${props => props.theme.colors.primary[3]};
  border-radius: 4px 4px 0 0;
  position: relative;
  cursor: pointer;

  ${props =>
    props.height &&
    css`
      height: ${(props.height * 2) / 3}px;
    `}

  ${props =>
    props.onMouse &&
    css`
      background-color: ${props.theme.colors.primary[1]};
    `}
`;

const BlockNumber = styled.div`
  position: absolute;
  top: -3rem;
  background-color: white;
  width: 10rem;
  height: 2rem;
  box-shadow: ${props => props.theme.boxShadow};
  transform: translateX(-50%);
  left: 50%;
  z-index: 99;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  display: none;

  ${props =>
    props.onMouse &&
    css`
      display: flex;
    `}
`;

const Number = styled.div`
  background-color: ${props => props.theme.colors.primary[1]};
  width: 60%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Count = styled.div`
  background-color: ${props => props.theme.colors.secondary[1]};
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GraphItem = ({ blockNumber, transactionCount }) => {
  const [onMouse, setOnMouse] = useState(false);

  const onMouseEnter = () => {
    setOnMouse(true);
  };

  const onMouseLeave = () => {
    setOnMouse(false);
  };

  return (
    <ItemWrapper
      onMouse={onMouse}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <StyledLink to={`/block/${blockNumber}`}>
        <Item height={transactionCount} onMouse={onMouse}>
          <BlockNumber onMouse={onMouse}>
            <Number>#{blockNumber}</Number>
            <Count>{transactionCount} TXs</Count>
          </BlockNumber>
        </Item>
      </StyledLink>
    </ItemWrapper>
  );
};

const EthereumGraph = ({ blockList }) => {
  const [graphList, setGraphList] = useState(null);
  useEffect(() => {
    const arr = [];
    blockList.forEach(({ number, transactions }) => {
      arr.push({
        blockNumber: number,
        transactionCount: transactions.length,
      });
    });
    setGraphList(arr.slice(0, 30));
  }, [blockList]);
  console.log(graphList);

  return (
    <Wrapper>
      <EthInfoHeader>
        <IconCotainer>
          <Ethereum size={48} />
        </IconCotainer>
        <EthName>Ethereum Explorer</EthName>
      </EthInfoHeader>
      <LatestBlocks>LASTEST 30 BLOCKS AND TRANSACTIONS COUNT</LatestBlocks>
      <GraphWrapper>
        {graphList &&
          graphList.map(({ blockNumber, transactionCount }) => (
            <GraphItem
              key={blockNumber}
              blockNumber={blockNumber}
              transactionCount={transactionCount}
            />
          ))}
      </GraphWrapper>
    </Wrapper>
  );
};

export default EthereumGraph;
