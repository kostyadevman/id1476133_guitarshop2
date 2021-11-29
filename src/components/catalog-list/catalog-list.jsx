import React from 'react';
import PropTypes from 'prop-types';
import Card from "../card/card";

const CatalogList = ({currentItems}) => {
  return (
      <ul className="catalog__list">
        {currentItems.map((item) => (
          <li className="catalog__item" key={item.id}>
            <Card item={item}/>
          </li>
        ))}
        {!currentItems.length &&
          <div className="catalog__regret">
            <p className="catalog__regret-text">Таких товаров нет, увы</p>
            <p className="catalog__regret-offer">Попробуйте смягчить условия поиска — то, что вам нужно, наверняка найдётся</p>
          </div>
      }
      </ul>
  );
};

CatalogList.propTypes = {
  currentItems: PropTypes.array.isRequired
};

export default CatalogList;
