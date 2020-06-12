import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Cube, Search, Home } from 'components/common/Icons';
import { showModal } from 'redux/modules/ui';
import SearchBoxContainer from 'containers/search/SearchBoxContainer';

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

const IconContainer = styled(Link)`
  cursor: pointer;
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
  const dispatch = useDispatch();
  const { blockList } = useSelector(({ blocks }) => ({
    blockList: blocks.blockList,
  }));

  const showSearchModal = () => {
    dispatch(
      showModal({
        content: <SearchBoxContainer />,
      }),
    );
  };

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
        <IconContainer selected={selected === 'home'} to="/block">
          <Home size={22} />
        </IconContainer>

        <IconContainer
          to={blockList && blockList[0] && `/block/${blockList[0].number}`}
          selected={selected === 'block'}
        >
          <Cube size={18} />
        </IconContainer>
        <IconContainer selected={selected === 'search'}>
          <Search size={22} onClick={showSearchModal} />
        </IconContainer>
      </Navigation>
    </Wrapper>
  );
};

export default SideNav;
