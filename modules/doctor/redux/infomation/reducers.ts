import { PayloadAction } from "@reduxjs/toolkit";
import { DoctorInfomation } from "./model";
import { Doctor } from "../model";

export const doctorReducers = {
  setDoctor: (state: Doctor, action: PayloadAction<DoctorInfomation>) => {
    state.infomation = { ...action.payload };
  },
};
