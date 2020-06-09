import React from 'react';
import styled from 'styled-components';
import ContentLayout from 'components/layouts/ContentLayout';
import { shortenAddress } from 'lib/utils';
import { Cube } from 'components/common/Icons';
import AddressWithIcon from 'components/common/AddressWithIcon';

const BlockNumber = styled.h1`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`;

const IconContainer = styled.div`
  margin-right: 1rem;

  svg {
    fill: ${props => props.theme.colors.primary[1]};
  }
`;

const Number = styled.div`
  color: ${props => props.theme.colors.primary[1]};
  font-size: 1.5rem;
  font-weight: 600;
`;

const Content = styled.div``;

const ItemWrapper = styled.div`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
`;

const Key = styled.div`
  color: ${props => props.theme.colors.gray[1]};
  font-weight: 600;
`;

const Value = styled.div`
  color: ${props => props.theme.colors.black[3]};
  font-weight: 500;
`;

const ViewTxnsButton = styled.button`
  background: ${props => props.theme.colors.primary[1]};
  color: white;
  padding: 1rem 2rem;
  margin-top: 4rem;
  margin-left: 1rem;
  border: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const Item = ({ name, value }) => {
  return (
    <ItemWrapper>
      <Key>{name}</Key>
      <Value>{value}</Value>
    </ItemWrapper>
  );
};

const BlockInfo = ({
  block,
  error,
  loading,
  viewTransactions,
  blocksLoading,
}) => {
  return (
    <ContentLayout
      title="Block Information"
      info
      loading={loading || blocksLoading}
      error={error}
    >
      {block && (
        <>
          <BlockNumber>
            <IconContainer>
              <Cube />
            </IconContainer>
            <Number>#{block.number}</Number>
          </BlockNumber>
          <Content>
            <Item name="nonce" value={block.nonce ? 'Success' : 'Pending'} />
            <Item name="gasUsed" value={block.gasUsed} />
            <Item name="gasLimit" value={block.gasLimit} />
            <Item name="difficulty" value={block.difficulty} />
            <Item name="blockSize" value={block.size} />
            <Item name="hash" value={shortenAddress(block.hash)} />
            <Item
              name="miner"
              value={<AddressWithIcon address={block.miner} />}
            />
            <Item name="number" value={block.number} />
            <Item name="timestamp" value={block.timestamp} />
          </Content>
          <ViewTxnsButton onClick={viewTransactions}>
            View All Transactions
          </ViewTxnsButton>
        </>
      )}
    </ContentLayout>
  );
};

export default BlockInfo;
