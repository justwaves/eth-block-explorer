import React from 'react';
import styled from 'styled-components';
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
  background-color: ${props => props.theme.colors.gray[5]};
  border-radius: 0.125rem;
  width: 50%;
`;

const Square = styled.div`
  width: 9rem;
  height: 1.365rem;
  background: ${props => props.theme.colors.gray[5]};
  border-radius: 0.25rem;
`;

const Item = ({ name }) => {
  return (
    <ItemWrapper>
      <Key>{name}</Key>
      <Value />
    </ItemWrapper>
  );
};

const TransactionInfoSkeleton = () => {
  return (
    <ContentLayout title="Transaction Information" info>
      <BlockNumber>
        <IconContainer>
          <Transaction />
        </IconContainer>
        <Number>
          <Square />
        </Number>
      </BlockNumber>
      <Content>
        <Item name="Hash" />
        <Item name="From" />
        <Item name="To" />
        <Item name="Value" />
        <Item name="BlockNumber" />
        <Item name="Nonce" />
        <Item name="Gas Price" />
        <Item name="Gas Used" />
        <Item name="Tx Fee" />
      </Content>
    </ContentLayout>
  );
};

export default TransactionInfoSkeleton;
