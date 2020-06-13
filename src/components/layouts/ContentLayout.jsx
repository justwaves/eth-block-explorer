import React from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router';
import Spinner from 'components/common/Spinner';
import Toggle from 'components/common/Toggle';
import BlockInfoSkeleton from 'components/blocks/BlockInfoSkeleton';
import TransactionInfoSkeleton from 'components/transactions/TransactionInfoSkeleton';
import { Refresh } from 'components/common/Icons';

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

const ErrorContainer = styled.div`
  min-height: 44.75rem;
  margin-top: 6.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  svg {
    cursor: pointer;
  }
`;

const ContentLayout = ({
  title,
  children,
  info,
  loading,
  error,
  toggle,
  toggleLabel,
  blocksView,
}) => {
  const history = useHistory();

  const onClick = () => {
    history.go();
  };

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

  if (error && blocksView) {
    return (
      <Wrapper>
        <ErrorContainer>
          <div>Retry</div>
          <Refresh size={32} onClick={onClick} />
        </ErrorContainer>
      </Wrapper>
    );
  }

  if (error) return null;

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

export default React.memo(ContentLayout);
