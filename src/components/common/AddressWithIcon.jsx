import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { shortenAddress } from 'lib/utils';
import Blockies from 'react-blockies';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1rem;
  position: relative;
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

const FullAddress = styled.div`
  position: absolute;
  top: -1.625rem;
  background-color: ${props => props.theme.colors.black[3]};
  color: white;
  font-size: 0.75rem;
  padding: 0.375rem;
  z-index: 9;
`;

const AddressWithIcon = ({ address, size, selected, hover, noIcon }) => {
  const [onMouse, setOnMouse] = useState(false);
  const shorten = shortenAddress(address);

  const onMouseEnter = () => {
    setOnMouse(true);
  };

  const onMouseLeave = () => {
    setOnMouse(false);
  };

  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {hover && onMouse && <FullAddress>{address}</FullAddress>}
      {!noIcon && <Blockies seed={address} scale={2} />}
      <Address size={size} selected={selected}>
        {shorten}
      </Address>
    </Wrapper>
  );
};

export default AddressWithIcon;
