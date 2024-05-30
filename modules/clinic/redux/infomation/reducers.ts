import { PayloadAction } from "@reduxjs/toolkit";
import { Clinic } from "../model";
import { ClinicInfomation } from "./model";

export const clinicReducers = {
  setClinic: (state: Clinic, action: PayloadAction<ClinicInfomation>) => {
    state.infomation = { ...action.payload };
  },
};
