import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { Crud, initialState } from "./model";
import _ from "lodash";

export const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    setFieldValue: <Key extends keyof Crud>(
      state: Crud,
      action: PayloadAction<{
        key: Key;
        value: Crud[Key];
      }>
    ) => {
      const { key, value } = action.payload;
      _.set(state, key, value);
    },
    setAllFieldValue: (state: Crud, action: PayloadAction<Crud>) => {
      state = { ...action.payload };
    },
  },
});
export const { setFieldValue, setAllFieldValue } = crudSlice.actions;

export default crudSlice.reducer;
