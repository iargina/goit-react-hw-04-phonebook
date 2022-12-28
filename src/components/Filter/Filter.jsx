import React, { Component } from 'react';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

export class Filter extends Component {
  render() {
    return (
      <>
        <input
          type="text"
          name="filter"
          className={css.input}
          value={this.props.stateFilter}
          onChange={this.props.renderOnChange}
        />
      </>
    );
  }
}
Filter.propTypes = {
  stateFilter: PropTypes.string,
  renderOnChange: PropTypes.func.isRequired,
};
