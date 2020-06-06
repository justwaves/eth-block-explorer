import React from 'react';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';

const Wrapper = styled.div`
  padding: 3rem;
`;

const Text = styled.div`
  margin-bottom: 1rem;
`;

const BlockInfoPresenter = ({ block, error, loading }) => {
  if (loading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  if (error) {
    return <Wrapper>(error icon)</Wrapper>;
  }

  return (
    <Wrapper>
      {block && (
        <>
          <Text>State: {block.nonce ? 'Success' : 'Pending'} </Text>
          <Text>gasUsed: {block.gasUsed} </Text>
          <Text>gasLimit: {block.gasLimit} </Text>
          <Text>difficulty: {block.difficulty} </Text>
          <Text>blockSize: {block.size} </Text>
          <Text>hash: {block.hash}</Text>
          <Text>miner: {block.miner}</Text>
          <Text>number: {block.number}</Text>
          <Text>timestamp: {block.timestamp}</Text>
        </>
      )}
    </Wrapper>
  );
};

export default BlockInfoPresenter;
