import React from 'react';
import styled from 'styled-components';
import { toEther, shortenAddress } from 'lib/utils';
import ContentLayout from 'components/layouts/ContentLayout';
import { Transaction } from 'components/common/Icons';

const BlockNumber = styled.h1`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`;

const IconContainer = styled.div`
  margin-right: 1rem;

  svg {
    fill: ${props => props.theme.colors.secondary[1]};
  }
`;

const Number = styled.div`
  color: ${props => props.theme.colors.secondary[1]};
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

const Item = ({ name, value }) => {
  return (
    <ItemWrapper>
      <Key>{name}</Key>
      <Value>{value}</Value>
    </ItemWrapper>
  );
};

const TransactionInfo = ({ loading, error, transaction }) => {
  return (
    <ContentLayout
      title="Transaction Information"
      info
      loading={loading}
      error={error}
    >
      {transaction && (
        <>
          <BlockNumber>
            <IconContainer>
              <Transaction />
            </IconContainer>
            <Number>{shortenAddress(transaction.hash)}</Number>
          </BlockNumber>
          <Content>
            <Item name="nonce" value={transaction.blockNumber} />
            <Item name="gasUsed" value={shortenAddress(transaction.hash)} />
            <Item
              name="gasLimit"
              value={shortenAddress(toEther(transaction.value).toFixed(2))}
            />
          </Content>
        </>
      )}
    </ContentLayout>
  );
};

export default TransactionInfo;
