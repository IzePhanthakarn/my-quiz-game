import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseDrawer, modelDrawer } from "./model";
import { filterFormReducers } from "./filter/reducer";

export const drawerSlice = createSlice({
  name: "Drawer",
  initialState: modelDrawer,
  reducers: {
    setIsOpenDrawer: (state: BaseDrawer, actions: PayloadAction<boolean>) => {
      state.isOpen = actions.payload;
    },
    ...filterFormReducers,
  },
});

export const { setIsOpenDrawer, setFilterForm } = drawerSlice.actions;

export default drawerSlice.reducer;
