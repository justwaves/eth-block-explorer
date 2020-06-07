import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.theme.width.sideNav};
  background-color: white;
  min-height: calc(100% - ${props => props.theme.width.sideNav});
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

const IconContainer = styled.a`
  & + & {
    margin-top: 3rem;
  }
`;

const SideNav = () => (
  <Wrapper>
    <Navigation>
      <IconContainer href="/">Main</IconContainer>
      <IconContainer href="/block/10217991">block</IconContainer>
      <IconContainer href="/block/10217991/0xda1551099f7aef08d54b9470762032f631b10dcc819f1a2fbabbaf42500593f7">
        tx
      </IconContainer>
    </Navigation>
  </Wrapper>
);
export default SideNav;
