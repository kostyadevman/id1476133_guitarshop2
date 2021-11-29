import React, {useEffect, useRef, useState} from 'react';
import { Breadcrumb } from 'react-breadcrumbs';
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from "react-paginate"
import CatalogList from "../../catalog-list/catalog-list";
import SideBar from "../../sidebar/sidebar";
import Sort from "../../sort/sort";
import Modal from "../../modal/modal";
import PopupAdd from "../../popups/popup-add/popup-add";
import PopupSuccess from "../../popups/popup-success/popup-success";
import MyBreadcrumbs from "../../my-breadcrumbs/my-breadcrumbs";
import {getAddPopupOpen, getSuccessPopupOpen, selectSortedItems } from "../../../store/selectors";
import {setPopupOpen} from "../../../store/action";
import {
  AppRoute,
  ITEMS_PER_PAGE,
  MARGIN_PAGES_DISPLAY, PAGE_HIDDEN,
  PAGE_RANGE_DISPLAY_ONE,
  PAGE_RANGE_DISPLAY_TWO,
  PopupType
} from "../../../const";


const  Catalog = () => {

  const catalogRef = useRef();
  const dispatch = useDispatch();
  const items = useSelector(selectSortedItems);
  const isAddPopupOpen = useSelector(getAddPopupOpen);
  const isSuccessPopupOpen = useSelector(getSuccessPopupOpen)

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageSelected, setPageSelected] = useState(0)

  const _handlePageClick = (event) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % items.length;
    setItemOffset(newOffset);
    setPageSelected(event.selected)
  };

  const _handlePopupClose = (type) => {
    dispatch(setPopupOpen(type, false))
  };

  useEffect(() => {
    catalogRef.current.querySelectorAll('.page__link ').forEach(item => item.href = "#");
  });

  useEffect(() => {
    setItemOffset(0);
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / ITEMS_PER_PAGE));
    setPageSelected(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / ITEMS_PER_PAGE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[itemOffset, ITEMS_PER_PAGE]);

  return (
    <section className="catalog" ref={catalogRef}>
      <h2 className="catalog__title">Каталог гитар</h2>
      <MyBreadcrumbs />
      <Breadcrumb data={{title: 'Главная', pathname: AppRoute.ROOT}} />
      <Breadcrumb data={{title: 'Каталог', pathname: AppRoute.ROOT}} />
      <SideBar />
      <Sort />
      <CatalogList currentItems={currentItems} />
      { pageCount > PAGE_HIDDEN &&
      <ReactPaginate
        className="catalog__pagination page"
        pageClassName="page__item"
        pageLinkClassName="page__link"
        previousClassName="page__item page__item--previous"
        previousLinkClassName="page__link page__link--previous"
        nextClassName="page__item page__item--next"
        nextLinkClassName="page__link page__link--next"
        breakClassName="page__item page__item--break"
        breakLinkClassName="page__link page__link--break"
        activeClassName="page__item--active"
        disabledClassName="page__item--disabled"
        breakLabel="..."
        previousLabel="Назад"
        nextLabel="Далее"
        onPageChange={_handlePageClick}
        pageCount={pageCount}
        forcePage={pageSelected}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={MARGIN_PAGES_DISPLAY}
        pageRangeDisplayed={(pageSelected === pageCount -1 ) ? PAGE_RANGE_DISPLAY_TWO : PAGE_RANGE_DISPLAY_ONE}
        hrefBuilder={(page, pageCount, selected) =>
            page >= 1 && page <= pageCount ? `/home/${page}` : '#'}
      />}
      {isAddPopupOpen &&
      <Modal onClose={() => _handlePopupClose(PopupType.ADD)} isOpen={isAddPopupOpen}>
        <PopupAdd />
      </Modal>}
      {isSuccessPopupOpen &&
      <Modal onClose={() => _handlePopupClose(PopupType.SUCCESS)} isOpen={isSuccessPopupOpen}>
        <PopupSuccess />
      </Modal>}
    </section>
  );
}

export default Catalog;
