import React from 'react';
import styled from 'styled-components';
import ContentLayout from './ContentLayout';

const Wrapper = styled.div``;

const ListLayout = ({ title, children }) => (
  <ContentLayout title={title}>
    <Wrapper>{children}</Wrapper>
  </ContentLayout>
);

export default ListLayout;
