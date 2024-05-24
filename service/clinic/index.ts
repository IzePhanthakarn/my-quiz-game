import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
