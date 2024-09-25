import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface doctorCompareParams {
	doctorCode: string;
	edit1: number | null;
	edit2: number | null;
}

export const getDoctorCompareHistory = createAsyncThunk(
	"Medical/getDoctorCompareHistory",
	async (params: doctorCompareParams, thunkAPI) => {
		const { doctorCode, edit1, edit2 } = params;
		const apiPath = `${API_PATH.GET_DOCTOR_HISOTRY_COMPARE}?doctorCode=${doctorCode}&edit1=${edit1}&edit2=${edit2}`;
		try {
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
