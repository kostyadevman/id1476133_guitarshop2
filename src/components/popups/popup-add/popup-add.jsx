import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentItem} from "../../../store/selectors";
import {addCartItem, setPopupOpen} from "../../../store/action";
import Stats from "../stats/stats";
import {PopupType} from "../../../const";

const PopupAdd = () => {
  const currentItem = useSelector(getCurrentItem)
  const dispatch = useDispatch();

  const _handleAddClick = () => {
    dispatch(addCartItem(currentItem));
    dispatch(setPopupOpen(PopupType.ADD, false));
    dispatch(setPopupOpen(PopupType.SUCCESS, true));
  }

  return (
    <section className="popup-add">
      <p className="popup-add__text">Добавить товар в корзину</p>
      <div className="popup-add__wrapper">
        <img className="popup-add__img" width="48" height="84" src={currentItem.img} alt={currentItem.name}/>
        <div className="popup-add__info">
          <Stats
            code={currentItem.code}
            type={currentItem.type}
            price={currentItem.price}
            name={currentItem.name}
            strings={currentItem.strings}
          />
        </div>
        <button
          className="button button--primary popup-add__button"
          onClick={_handleAddClick}
          aria-label="Add good to cart"
        >
          Добавить в корзину
        </button>
      </div>
    </section>
  );
};

export default PopupAdd;
