import {createReducer} from "@reduxjs/toolkit";
import { Guitars } from "../data/guitars";
import { Filters } from "../data/filters";
import {
  addCartItem,
  deleteCartItem,
  setCurrentItem,
  setFilterValue,
  setPopupOpen,
  setSortDirection,
  setSortType
} from "./action";
import {PopupType, SortDirection, SortType} from "../const";


const initialState = {
  guitars: Guitars,
  filters: Filters,
  sortType: SortType.DEFAULT,
  sortDirection: SortDirection.DEFAULT,
  cartItems: [],
  currentItem: null,
  isAddPopupOpen: false,
  isDeletePopupOpen: false,
  isSuccessPopupOpen: false
}

const rootReducer = createReducer(initialState, (builder => {
  builder.addCase(setFilterValue, (state, action) => {
    const filter = state.filters[action.payload.type].find((item) => item.name === action.payload.name);
    filter.value = action.payload.value;
  });
  builder.addCase(setSortType, (state, action) => {
    state.sortType = action.payload
  });
  builder.addCase(setSortDirection, (state, action) => {
    state.sortDirection = action.payload
  });
  builder.addCase(addCartItem, (state, action) => {
    let itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
    itemIndex !== -1 ?
      state.cartItems[itemIndex].amount++ :
      state.cartItems = [...state.cartItems, Object.assign({}, action.payload, {amount: 1})];
  });
  builder.addCase(deleteCartItem, (state, action) => {
    if (action.payload.deleteCopies) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.item.id)
    } else {
      let itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.item.id)
      state.cartItems[itemIndex].amount > 1 ?
        state.cartItems[itemIndex].amount-- :
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.item.id)
    }
  });
  builder.addCase(setCurrentItem, (state, action) => {
    state.currentItem = action.payload
  });
  builder.addCase(setPopupOpen, (state, action) => {
    switch (action.payload.popupType) {
      case PopupType.ADD:
        state.isAddPopupOpen = action.payload.status;
        break;
      case PopupType.DELETE:
        state.isDeletePopupOpen = action.payload.status;
        break;
      case PopupType.SUCCESS:
        state.isSuccessPopupOpen = action.payload.status;
        break;
      default:
        return state
    }
  });
  builder.addDefaultCase((state, action) => {});
}));

export default rootReducer;
