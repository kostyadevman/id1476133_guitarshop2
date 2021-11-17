import {createReducer} from "@reduxjs/toolkit";

const initialState = {

}

const rootReducer = createReducer(initialState, (builder => {
  builder.addDefaultCase((state, action) => {});
}));

export default rootReducer;
