import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "../slices/crud";
import clinicSlice from "../../modules/clinic/redux";
import doctorSlice from "@/modules/doctor/redux";

export const store = configureStore({
  reducer: {
    crud: crudSlice,
    clinic: clinicSlice,
    doctor: doctorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
