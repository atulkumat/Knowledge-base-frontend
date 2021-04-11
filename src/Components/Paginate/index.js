import PropTypes from 'prop-types';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import useQuery from 'hooks/useQuery';

const Paginate = ({
  length, perPage, currentPage, setCurrentPage,
}) => {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
    query.set('page_no', selectedPage + 1);
    history.push({
      pathname: location.pathname,
      search: query.toString(),
    });
  };

  return (
    <ReactPaginate
      previousLabel='← Previous'
      nextLabel='Next →'
      pageCount={Math.ceil(length / perPage)}
      onPageChange={handlePageChange}
      forcePage={currentPage}
      disableInitialCallback
      containerClassName='pagination'
      previousLinkClassName='pagination__link'
      nextLinkClassName='pagination__link'
      disabledClassName='pagination__link--disabled'
      activeClassName='pagination__link--active'
    />
  );
};

Paginate.propTypes = {
  length: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Paginate;
