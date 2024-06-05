import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseDialog, modelDialog } from "./model";

export const dialogSlice = createSlice({
  name: "Dialog",
  initialState: modelDialog,
  reducers: {
    setIsOpenDialog: (state: BaseDialog, actions: PayloadAction<boolean>) => {
      state.isOpen = actions.payload;
    },
  },
});

export const { setIsOpenDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
