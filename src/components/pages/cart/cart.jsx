import React, {useEffect, useRef, useState} from 'react';
import { Breadcrumb } from 'react-breadcrumbs'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import classNames from "classnames";
import Modal from "../../modal/modal";
import PopupDelete from "../../popups/popup-delete/popup-delete";
import MyBreadcrumbs from "../../my-breadcrumbs/my-breadcrumbs";
import {getDeletePopupOpen, getCartItems} from "../../../store/selectors";
import {addCartItem, deleteCartItem, setCurrentItem, setPopupOpen} from "../../../store/action";
import {capitalize} from "../../../utils";
import {AppRoute, MAX_SALE, PopupType, PromoCode, promoCodes, PromoCodesMap} from "../../../const";

const Cart = () => {

  const cartRef = useRef();
  const dispatch = useDispatch();
  const items = useSelector(getCartItems);
  const isDeletePopupOpen = useSelector(getDeletePopupOpen);

  const [promoCode, setPromoCode] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(`NO_PROMOCODE`);

  const getTotalSum = () => {
    return items.reduce((a, b) => (a + b.price * b.amount), 0)
  }

  const [totalSum, setTotalSum] = useState(getTotalSum());

  const getItemSum = (item) => {
    return item.amount * item.price;
  }

  const getWithSale = (sum) => {
    switch (promoCode) {
      case PromoCode.GITARAHIT:
        return sum - sum * PromoCodesMap[PromoCode.GITARAHIT];
      case PromoCode.SUPERGITARA:
        return sum - PromoCodesMap[PromoCode.SUPERGITARA];
      case PromoCode.GITARA2020:
        return MAX_SALE * sum >= PromoCodesMap[PromoCode.GITARA2020] ?
          sum - PromoCodesMap[PromoCode.GITARA2020] :
          sum - MAX_SALE * sum;
      default:
        return sum;
    }
  }

  const _getPromoClassName = () => {
    return classNames(
      'cart__promo',
      {'cart__promo--invalid': !isCodeValid},
    )
  };

  const _handleAddClick = (item) => {
    dispatch(addCartItem(item));
  }

  const _handleDeleteClick = (item) => {
    if (item.amount > 1) {
      dispatch(deleteCartItem(item))
    } else {
      dispatch(setPopupOpen(PopupType.DELETE, true));
      dispatch(setCurrentItem(item));
    }
  }

  const _handlePromoChange = (evt) => {
    setPromoCode(evt.target.value);
  }

  const _handlePromoClick = () => {
    promoCodes.includes(promoCode) ? setIsCodeValid(true) : setIsCodeValid(false);
  }

  const _handlePopupClose = (type) => {
    dispatch(setPopupOpen(type, false))
  };

  const _handleCloseClick = (item) => {
    dispatch(setCurrentItem(item));
    dispatch(setPopupOpen(PopupType.DELETE, true));
  }

  const _handlePromoFocus = () => {
    setIsCodeValid(`NO_PROMOCODE`)
  }

  useEffect(() => {
    const sum = getTotalSum();
    if (isCodeValid) {
      setTotalSum(getWithSale(sum))
    } else {
      setTotalSum(sum);
      setIsCodeValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCodeValid, items])

  return (
    <section className="cart" ref={cartRef}>
      <h2 className="cart__title">Корзина</h2>
      <MyBreadcrumbs />
      <Breadcrumb data={{title: 'Главная', pathname: AppRoute.ROOT}} />
      <Breadcrumb data={{title: 'Каталог', pathname: AppRoute.ROOT}} />
      <Breadcrumb data={{title: 'Оформляем', pathname: AppRoute.CART}} />
      <ul className="cart__list">
        {items.map((item) => (
          <li key={item.id} className="cart__item">
            <button className="cart__close" onClick={() => _handleCloseClick(item)} aria-label="Remove good">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.77 11.835L6.00004 7.05754L1.23004 11.835L0.165039 10.77L4.94254 6.00004L0.165039 1.23004L1.23004 0.165039L6.00004 4.94254L10.77 0.172539L11.8275 1.23004L7.05754 6.00004L11.8275 10.77L10.77 11.835Z" fill="#9F9E9E"/>
          </svg>
        </button>
            <img className="cart__img" width="48" height="124" src={item.img} alt={item.name}/>
            <div className="cart__wrapper-info">
              <div className="cart__name">
                {item.type.toUpperCase()}
                <span>{item.name.toUpperCase()}</span>
              </div>
              <div className="cart__code">Артикул: <span>{item.code}</span></div>
              <div className="cart__strings">{capitalize(item.type)},{item.strings} струнная</div>
            </div>
            <p className="cart__price">{item.price.toLocaleString(`fr`)} ₽</p>
            <div className="cart__wrap-control">
              <button
                className="cart__delete"
                onClick={() => _handleDeleteClick(item)}
                aria-label="Delete one good"
              >
                -
              </button>
              <label htmlFor="amount" className="cart__label visually-hidden">количества товара</label>
              <input id="amount" type="number" className="cart__amount" value={item.amount} disabled/>
              <button
                className="cart__add"
                onClick={() => _handleAddClick(item)}
                aria-label="Add one good"
              >
                +
              </button>
            </div>
            <p className="cart__item-sum">{`${getItemSum(item)} ₽`}</p>
          </li>
        ))}
        {!items.length && <div className="cart__empty">Корзина пуста</div>}
      </ul>
      {items.length !== 0 && (
        <div className="cart__order">
          <div className="cart__wrapper-promo">
            <p className="cart__text">Промокод на скидку</p>
            <p className="cart__hint">Введите свой промокод, если он у вас есть.</p>
            <input
              id="promo"
              type="text"
              className={_getPromoClassName()}
              onChange={_handlePromoChange}
              onFocus={_handlePromoFocus}
              autoComplete="off"
            />
            <label className="cart__label visually-hidden" htmlFor="promo">Промокод</label>
            {!isCodeValid && <span className="cart__invalid-text">Промокод не действителен</span>}
            <button
              className="button button--secondary cart__button-promo"
              onClick={_handlePromoClick}
              aria-label="Apply promo code"
            >
              Применить купон
            </button>
          </div>
          <div className="cart__wrapper-sum">
            <span className="cart__total-sum">Всего: {totalSum} ₽</span>
            <Link to="#" className="button button--primary cart__button-order">
              Оформить заказ
            </Link>
          </div>
        </div>
      )}
      {isDeletePopupOpen &&
      <Modal onClose={() => _handlePopupClose(PopupType.DELETE)} isOpen={isDeletePopupOpen}>
        <PopupDelete />
      </Modal>}
    </section>
  );
};

export default Cart;
