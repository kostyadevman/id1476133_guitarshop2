import React from 'react';
import Filters from "./filters/filters";

const SideBar = () => {

  return (
    <aside className="catalog__sidebar sidebar">
      <h2 className="sidebar__title">Фильтр</h2>
      <Filters />
    </aside>
  );
};

export default SideBar;
