import { configureStore } from "@reduxjs/toolkit";
import clinicSlice from "../slices/clinic";

export const store = configureStore({
  reducer: {
    clinic: clinicSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
