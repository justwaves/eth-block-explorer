import React from 'react';
import styled from 'styled-components';
import ContentLayout from 'components/layouts/ContentLayout';
import { Cube } from 'components/common/Icons';

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
    fill: ${props => props.theme.colors.gray[1]};
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
  font-weight: 500;
`;

const Value = styled.div`
  color: ${props => props.theme.colors.black[3]};
  font-weight: 500;
  background-color: ${props => props.theme.colors.gray[5]};
  border-radius: 0.125rem;
  width: 50%;
  position: relative;
`;

const ViewTxnsButton = styled.button`
  background: ${props => props.theme.colors.gray[1]};
  color: white;
  padding: 1rem 2rem;
  margin-top: 3rem;
  border: 0;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: not-allowed;
`;

const Square = styled.div`
  width: 7.5rem;
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

const BlockInfoSkeleton = () => {
  return (
    <ContentLayout title="Block Information" info>
      <Wrapper>
        <BlockNumber>
          <IconContainer>
            <Cube />
          </IconContainer>
          <Number>
            <Square />
          </Number>
        </BlockNumber>
        <Content>
          <Item name="State" />
          <Item name="Timestamp" />
          <Item name="Miner" />
          <Item name="Hash" />
          <Item name="Nonce" />
          <Item name="Size" />
          <Item name="Gas Used" />
          <Item name="Gas Limit" />
          <Item name="Difficulty" />
          <Item name="SHA3 Uncles" />
          <Item name="Transactions" />
          <Item name="Valid Txns" />
        </Content>
        <ViewTxnsButton>View All Valid Transactions</ViewTxnsButton>
      </Wrapper>
    </ContentLayout>
  );
};

export default BlockInfoSkeleton;
