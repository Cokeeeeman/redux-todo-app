import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ filter, children }) => {
  return (
    <NavLink
    to={filter === 'all' ? '/' : `/${filter}`}
    exact
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
    >
      { children }
    </NavLink>
  );
};

export default FilterLink;
