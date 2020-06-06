import React from 'react';
import styled from 'styled-components';
import BlocksTable from '../../components/BlocksTable';
import Spinner from '../../components/Spinner';

const Wrapper = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBox = styled.div``;

const SearchInput = styled.input``;

const BlocksPresenter = ({
  blockList,
  error,
  lastBlockLoading,
  blocksLoading,
}) => {
  if (lastBlockLoading || blocksLoading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  if (error) {
    return <Wrapper>error</Wrapper>;
  }

  return (
    <Wrapper>
      <SearchBox>
        <SearchInput />
      </SearchBox>
      <BlocksTable blockList={blockList} />
    </Wrapper>
  );
};

export default BlocksPresenter;
