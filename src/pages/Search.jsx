import React, { useState } from 'react';
import styled from 'styled-components';
import Toggle from 'components/common/Toggle';

const Wrapper = styled.div``;

const Search = () => {
  const [checked, setChecked] = useState(true);

  const onClick = () => {
    setChecked(!checked);
  };
  console.log(checked);

  return (
    <Wrapper>
      <Toggle onClick={onClick} checked={checked} />
    </Wrapper>
  );
};

export default Search;
