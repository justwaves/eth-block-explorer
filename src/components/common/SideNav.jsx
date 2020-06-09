import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Cube } from 'components/common/Icons';
import { Search, Home } from './Icons';

const Wrapper = styled.div`
  width: ${props => props.theme.width.sideNav};
  background-color: white;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const IconContainer = styled.a`
  & + & {
    margin-top: 4rem;
  }

  svg {
    fill: ${props => props.theme.colors.gray[2]};

    ${props =>
      props.selected &&
      css`
        fill: ${props.theme.colors.primary[1]};
      `}
  }
`;

const SideNav = () => {
  const { id } = useParams();
  const { blockList } = useSelector(({ blocks }) => ({
    blockList: blocks.blockList,
  }));

  let selected;

  if (!id) {
    selected = 'home';
  }
  if (id) {
    selected = 'block';
  }
  return (
    <Wrapper>
      <Navigation>
        <IconContainer href="/" selected={selected === 'home'}>
          <Home size={22} />
        </IconContainer>
        <IconContainer
          href={blockList && blockList[0] && `/block/${blockList[0].number}`}
          selected={selected === 'block'}
        >
          <Cube size={18} />
        </IconContainer>
        <IconContainer href="/search" selected={selected === 'search'}>
          <Search size={22} />
        </IconContainer>
      </Navigation>
    </Wrapper>
  );
};
export default SideNav;
