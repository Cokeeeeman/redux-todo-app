import React from 'react';
import FilterLink from './FilterLink';
// visibilityFilter = { visibilityFilter }
// onFilterClick = {
//   filter => {
//     store.dispatch({
//       type: "SET_VISIBILITY_FILTER",
//       filter
//     });
//   }
// }
const Footer = () => {
  return (
    <div>
      {'Show: '}
      <FilterLink filter='SHOW_ALL'>
        All
      </FilterLink>
      {' '}
      <FilterLink filter='SHOW_ACTIVE'>
        Active
      </FilterLink>
      {' '}
      <FilterLink filter='SHOW_COMPLETED'>
        Completed
      </FilterLink>
      {' '}
    </div>
  );
}

export default Footer;