import React from 'react';
import styled, { css } from 'styled-components';
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

const SearchForm = styled.form`
  width: 100%;
`;

const Error = styled.div`
  margin-top: 0.75rem;
  margin-left: 1.5rem;
  color: ${props => props.theme.colors.red};
  position: absolute;
  bottom: -2rem;
  left: 0;
  display: none;

  ${props =>
    props.showError &&
    css`
      display: block;
    `}
`;

const SearchBox = ({ onSubmit, inputValue, onChange, showError }) => {
  return (
    <Wrapper>
      <InputContainer>
        <SearchForm onSubmit={onSubmit}>
          <SearchInput
            placeholder="Search block"
            value={inputValue}
            name="search"
            onChange={onChange}
            autoComplete="off"
          />
        </SearchForm>
        <SearchIcon onClick={onSubmit}>
          <Search />
        </SearchIcon>
      </InputContainer>
      <Error showError={showError}>{`There is no block # ${showError}`}</Error>
    </Wrapper>
  );
};

export default React.memo(SearchBox);
