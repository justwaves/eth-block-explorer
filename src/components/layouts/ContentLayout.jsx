import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.theme.width.content};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const Content = styled.div``;

const ContentLayout = ({ title, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Content>{children}</Content>
  </Wrapper>
);

export default ContentLayout;
