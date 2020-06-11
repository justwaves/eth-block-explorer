import React from 'react';
import styled, { css } from 'styled-components';
import Spinner from 'components/common/Spinner';
import Toggle from 'components/common/Toggle';
import BlockInfoSkeleton from 'components/blocks/BlockInfoSkeleton';
import TransactionInfoSkeleton from 'components/transactions/TransactionInfoSkeleton';

const Wrapper = styled.div`
  width: ${props => props.theme.width.content};
  margin-right: 4.5rem;
  position: relative;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  height: 1.5rem;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleLabel = styled.div`
  font-size: 0.75rem;
`;

const ToggleWrapper = styled.div`
  margin-left: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;

  svg {
    fill: ${props => props.theme.colors.primary[1]};
    margin: 0 0.5rem;
  }
`;

const Content = styled.div`
  min-height: 44.75rem;

  ${props =>
    props.loading &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

  ${props =>
    props.info &&
    css`
      box-shadow: 0;
      border-radius: ${props.theme.borderRadius};
      padding: 1.25rem;
    `}
`;

const ContentLayout = ({
  title,
  children,
  info,
  loading,
  error,
  toggle,
  toggleLabel,
}) => {
  if (info && loading) {
    return (
      <Wrapper>
        {title === 'Block Information' ? (
          <BlockInfoSkeleton />
        ) : (
          <TransactionInfoSkeleton />
        )}
      </Wrapper>
    );
  }

  if (loading) {
    return (
      <Wrapper>
        <ContentHeader>
          <Title>{title}</Title>
          <ToggleContainer>
            <ToggleLabel>{toggleLabel}</ToggleLabel>
            {toggle && (
              <ToggleWrapper>
                <Toggle disabled />
              </ToggleWrapper>
            )}
          </ToggleContainer>
        </ContentHeader>
        <Spinner />
      </Wrapper>
    );
  }

  if (error) {
    return <Wrapper>error</Wrapper>;
  }

  return (
    <Wrapper>
      <ContentHeader>
        <Title>{title}</Title>
        {toggle && (
          <ToggleContainer>
            <ToggleLabel>{toggleLabel}</ToggleLabel>
            <ToggleWrapper>{toggle}</ToggleWrapper>
          </ToggleContainer>
        )}
      </ContentHeader>
      <Content info={info} loading={loading}>
        {children}
      </Content>
    </Wrapper>
  );
};

export default ContentLayout;
