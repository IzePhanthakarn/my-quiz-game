import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setClinicGrid } from "../redux";
import { ClinicForm, ClinicGrid } from "../redux/infomation/model";

export const getClinicList = createAsyncThunk(
  "Medical/getClinic",
  async (_, thunkAPi) => {
    try {
      const apiPath = `${API_PATH.GET_CLINIC}`;
      const response = await axios.get(apiPath);
      return response.data;
    } catch (err) {
      return thunkAPi.rejectWithValue("");
    }
  }
);

export const initClinicGrid = async (dispatch: AppDispatch) => {
  const data = await dispatch(getClinicList());
  const grid = data.payload.map((data: ClinicForm, index: number) => {
    return {
      id: index,
      clinicCode: data.clinicCode,
      clinicName: data.clinicName,
    };
  });
  dispatch(setClinicGrid(grid));
};
