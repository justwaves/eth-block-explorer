import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Text = styled.div`
  font-size: 0.875rem;
  width: 7rem;
  text-align: center;
`;

const Button = styled.button`
  border: 0;
  outline: 0;
  margin: 0 0.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  background-color: white;

  ${props =>
    props.disabled &&
    css`
      color: ${props.theme.colors.gray[3]};
    `}
`;

const Content = styled.div``;

const PER_PAGE = 7;

const Pagination = ({ items, children }) => {
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [paginationStartS, setPaginationStartS] = useState(1);
  const [paginationEndS, setPaginationEndS] = useState(PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let paginationEnd =
      items.length > PER_PAGE ? currentPage * PER_PAGE : items.length;

    if (paginationEnd > items.length) {
      paginationEnd = items.length;
    }

    let paginationStart =
      items.length > PER_PAGE ? paginationEnd - PER_PAGE + 1 : 1;

    if (paginationEnd === items.length) {
      const remaining = paginationEnd % PER_PAGE;
      if (remaining !== 0) {
        paginationStart = paginationEnd - remaining;
      }
    }

    if (paginationEnd < PER_PAGE) {
      paginationStart = 1;
    }

    setPaginationStartS(paginationStart);
    setPaginationEndS(paginationEnd);
  }, [currentPage, items.length]);

  useEffect(() => {
    setPaginatedItems(items.slice(paginationStartS - 1, paginationEndS));
  }, [items, paginationEndS, paginationStartS]);

  const onClick = () => {
    setCurrentPage(() => {
      let lastPage = Math.floor(items.length / PER_PAGE);
      if (items.length % PER_PAGE !== 0) {
        lastPage += 1;
      }
      return lastPage;
    });
  };

  return (
    <>
      {items.length === 0 && (
        <div>
          <Text>No items to show.</Text>
        </div>
      )}

      {items.length > 0 && (
        <>
          <Content>{children(paginatedItems)}</Content>
          <Wrapper>
            <Button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              first
            </Button>
            <Button
              onClick={() => setCurrentPage(page => page - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            <Text>
              {`${paginationStartS} - ${paginationEndS} of ${items.length}`}
            </Text>
            <Button
              onClick={() => setCurrentPage(page => page + 1)}
              disabled={paginationEndS === items.length}
            >
              &gt;
            </Button>
            <Button
              onClick={onClick}
              disabled={paginationEndS === items.length}
            >
              last
            </Button>
          </Wrapper>
        </>
      )}
    </>
  );
};

Pagination.propTypes = {
  items: PropTypes.arrayOf.isRequired,
  children: PropTypes.func.isRequired,
};

export default Pagination;
