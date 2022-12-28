import React from 'react';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ stateFilter, renderOnChange }) => {
  return (
    <>
      <input
        type="text"
        name="filter"
        className={css.input}
        value={stateFilter}
        onChange={renderOnChange}
      />
    </>
  );
};

Filter.propTypes = {
  stateFilter: PropTypes.string,
  renderOnChange: PropTypes.func.isRequired,
};
