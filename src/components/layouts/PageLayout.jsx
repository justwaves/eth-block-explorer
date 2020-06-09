import React from 'react';
import styled from 'styled-components';
// import Header from 'components/common/Header';
import SideNav from 'components/common/SideNav';

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  width: calc(100%- 3rem);
  padding-left: 3rem;
`;

const Main = styled.main`
  display: flex;
`;

const Children = styled.div`
  padding: 2.25rem;
  display: flex;
  margin-left: 3rem;
  margin-top: 1rem;
`;

const Layout = ({ children }) => (
  <Wrapper>
    {/* <Header /> */}
    <Main>
      <SideNav />
      <Children>{children}</Children>
    </Main>
  </Wrapper>
);

export default Layout;
