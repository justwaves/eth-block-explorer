import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div``;

const Text = styled.div``;

const Button = styled.button``;

const Content = styled.div``;

const PER_PAGE = 10;

const Pagination = ({ items, children }) => {
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [paginationStartS, setPaginationStartS] = useState(1);
  const [paginationEndS, setPaginationEndS] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let paginationEnd =
      items.length > 10 ? currentPage * PER_PAGE : items.length;

    if (paginationEnd > items.length) {
      paginationEnd = items.length;
    }

    let paginationStart = items.length > 10 ? paginationEnd - PER_PAGE + 1 : 1;

    if (paginationEnd === items.length) {
      const remaining = paginationEnd % 10;
      if (remaining !== 0) {
        paginationStart = paginationEnd - remaining;
      }
    }

    if (paginationEnd < 10) {
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
          <Wrapper>
            <Text>
              {`${paginationStartS} - ${paginationEndS} of ${items.length}`}
            </Text>
            <div>
              <Button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <u>&lt;</u>
                start
              </Button>
              <Button
                onClick={() => setCurrentPage(page => page - 1)}
                disabled={currentPage === 1}
              >
                &lt; back
              </Button>
              <Button
                onClick={() => setCurrentPage(page => page + 1)}
                disabled={paginationEndS === items.length}
              >
                next &gt;
              </Button>
              <Button
                onClick={onClick}
                disabled={paginationEndS === items.length}
              >
                <u> end &gt;</u>
              </Button>
            </div>
          </Wrapper>

          <Content>{children(paginatedItems)}</Content>
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
