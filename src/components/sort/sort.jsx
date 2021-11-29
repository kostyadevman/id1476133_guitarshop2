import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {getSortDirection, getSortType} from "../../store/selectors";
import {setSortDirection, setSortType} from "../../store/action";
import {SortDirection, SortType, sortTypes} from "../../const";


const Sort = () => {

  const dispatch = useDispatch();
  const sortType = useSelector(getSortType);
  const sortDirection = useSelector(getSortDirection);

  const _getSortClassName = (type) => {
    return classNames(
      'sort__item',
      {'sort__item--active': sortType === type},
    )
  };

  const _getDirectionClassName = (direction) => {
    return classNames(
      'sort__button',
      `sort__button--${direction}`,
      {'sort__button--active': sortDirection === direction},

    )
  };

  const _handleSortClick = (type) => {
    if (sortType === type){
      dispatch(setSortType(SortType.DEFAULT));
      dispatch(setSortDirection(SortDirection.DEFAULT));
    } else {
      dispatch(setSortType(type));
      sortDirection === SortDirection.DEFAULT && dispatch(setSortDirection(SortDirection.INC));
    }
  };

  const _handleDirectionClick = (direction) => {
    if (sortDirection === direction) {
      dispatch(setSortDirection(SortDirection.DEFAULT));
      dispatch(setSortType(SortType.DEFAULT));
    } else {
      dispatch(setSortDirection(direction));
      sortType === SortType.DEFAULT && dispatch(setSortType(SortType.BY_PRICE));
    }
  };

  return (
    <div className="catalog__sort sort">
      <span className="sort__text">Сортировать:</span>
      <ul className="sort__list">
        {sortTypes.map((item) => (
          <li
            key={item.id}
            className={_getSortClassName(item.type)}
            tabIndex={0}
            onClick={() => _handleSortClick(item.type)}
            onKeyPress={() => _handleSortClick(item.type)}
          >
            {item.text}
          </li>
        ))}
      </ul>
      <div className="sort__directions">
        <button
          className={_getDirectionClassName(SortDirection.INC)}
          onClick={() => _handleDirectionClick(SortDirection.INC)}
          aria-label="From low to high order"
        >
          <svg width="14" height="11" viewBox="0 0 14 11"  xmlns="http://www.w3.org/2000/svg">
            <path d="M0.583008 10.667H13.4163L6.99968 0.583659L0.583008 10.667Z" />
          </svg>
        </button>
        <button
          className={_getDirectionClassName(SortDirection.DEC)}
          onClick={() => _handleDirectionClick(SortDirection.DEC)}
          aria-label="From high to low order"
        >
          <svg width="14" height="11" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.417 0.333008L0.583657 0.333008L7.00032 10.4163L13.417 0.333008Z" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default Sort;
