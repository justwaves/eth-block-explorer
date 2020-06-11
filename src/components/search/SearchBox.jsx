import React from 'react';
import styled from 'styled-components';
import { Search } from 'components/common/Icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: ${props => props.theme.colors.gray[4]};
  }
`;

const InputContainer = styled.div`
  width: 50rem;
  height: 4rem;
  border: 1px solid ${props => props.theme.colors.gray[4]};
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
`;

const SearchIcon = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 0.25rem 1rem;
`;

const SearchBox = () => {
  return (
    <Wrapper>
      <InputContainer>
        <SearchInput placeholder="Search block" />
        <SearchIcon>
          <Search />
        </SearchIcon>
      </InputContainer>
    </Wrapper>
  );
};

export default SearchBox;
