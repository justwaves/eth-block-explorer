import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const TableHeader = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: blue;
`;

const ItemWrapper = styled.div`
  padding: 1rem 0;
  border-top: 1px solid ${props => props.theme.colors.grey[3]};
`;

const Text = styled.div`
  margin-top: 0.5rem;
`;

const BlockItem = ({ item }) => {
  console.log(item);
  return (
    <ItemWrapper>
      <Text>
        <StyledLink to={`/block/${item.number}`}>{item.number}</StyledLink>
      </Text>
      <Text>miner: {item.miner}</Text>
      <Text>Gas Used: {item.gasUsed}</Text>
    </ItemWrapper>
  );
};

const BlocksTable = ({ blockList }) => {
  console.log('items', blockList);
  return (
    <Wrapper>
      <TableHeader>Miner & Gas Used</TableHeader>

      {blockList.map(item => (
        <BlockItem item={item} key={item.number} />
      ))}
    </Wrapper>
  );
};

BlocksTable.propTypes = {
  blockList: PropTypes.arrayOf.isRequired,
};

export default BlocksTable;
