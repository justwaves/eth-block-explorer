import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: ${props => props.theme.width.sideNav};
  background-color: white;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: ${props => props.theme.width.sideNav};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary[1]};
  font-size: 1.5rem;
`;

const Header = () => (
  <Wrapper>
    <LogoContainer>LOGO</LogoContainer>
    <Title>Block Explorer</Title>
  </Wrapper>
);

export default Header;
