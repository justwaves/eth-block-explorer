import React from 'react';
import styled, { css } from 'styled-components';
import { shortenAddress } from 'lib/utils';
import Blockies from 'components/common/Identicon';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1rem;
`;

const Address = styled.div`
  font-size: 0.875rem;
  padding: 0 0.25rem;
  background-color: ${props => props.theme.colors.gray[6]};
  height: 100%;

  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.colors.black[3]};
    `}
`;

const AddressWithIcon = ({ address, size, selected }) => {
  const shorten = shortenAddress(address);

  return (
    <Wrapper>
      <Blockies seed={address} scale={2} />
      <Address size={size} selected={selected}>
        {shorten}
      </Address>
    </Wrapper>
  );
};

export default AddressWithIcon;
