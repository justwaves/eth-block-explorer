import React from 'react';
import styled from 'styled-components';
import Header from 'components/common/Header';
import SideNav from 'components/common/SideNav';

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  width: 100%;
`;

const Main = styled.main`
  display: flex;
`;

const Children = styled.div`
  padding: 2.25rem;
  display: flex;
`;

const Layout = ({ children }) => (
  <Wrapper>
    <Header />
    <Main>
      <SideNav />
      <Children>{children}</Children>
    </Main>
  </Wrapper>
);

export default Layout;
