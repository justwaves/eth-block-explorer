import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ContentLayout from 'components/layouts/ContentLayout';
import { shortenAddress } from 'lib/utils';
import { Cube } from 'components/common/Icons';
import AddressWithIcon from 'components/common/AddressWithIcon';

const Wrapper = styled.div``;

const BlockNumber = styled.h1`
  display: flex;
  align-items: center;
  align-self: flex-start;
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
  margin-top: 1.75rem;
  grid-template-columns: 7rem 12rem;
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
  margin-top: 3rem;
  border: 0;
  border-radius: 0.25rem;
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
  transactionListLength,
}) => {
  return (
    <ContentLayout
      title="Block Information"
      info
      loading={loading || blocksLoading}
      error={error}
    >
      {block && (
        <Wrapper>
          <BlockNumber>
            <IconContainer>
              <Cube />
            </IconContainer>
            <Number>#{block.number}</Number>
          </BlockNumber>
          <Content>
            <Item name="State" value={block.nonce ? 'Success' : 'Pending'} />
            <Item
              name="Timestamp"
              value={moment(block.timestamp).format('lll')}
            />
            <Item
              name="Miner"
              value={<AddressWithIcon address={block.miner} hover />}
            />
            <Item
              name="Hash"
              value={<AddressWithIcon address={block.hash} hover noIcon />}
            />
            <Item name="Nonce" value={block.nonce} />
            <Item name="Size" value={`${block.size} bytes`} />
            <Item name="Gas Used" value={block.gasUsed} />
            <Item name="Gas Limit" value={block.gasLimit} />
            <Item name="Difficulty" value={block.difficulty} />
            {/* <Item name="Extra Data" value={block.extraData} /> */}
            <Item
              name="SHA3 Uncles"
              value={
                <AddressWithIcon address={block.sha3Uncles} hover noIcon />
              }
            />
            <Item name="Transactions" value={block.transactions.length} />
            <Item name="Valid Transactions" value={transactionListLength} />
          </Content>
          <ViewTxnsButton onClick={viewTransactions}>
            View All Valid Transactions
          </ViewTxnsButton>
        </Wrapper>
      )}
    </ContentLayout>
  );
};

export default BlockInfo;
