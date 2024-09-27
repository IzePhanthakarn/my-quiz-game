import API_PATH from "@/constants/api";
import { compareParams } from "@/modules/doctor/redux/history/model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDoctorCompareHistoryList = createAsyncThunk(
	"Medical/getDoctorCompareHistoryList",
	async (params: compareParams, thunkAPI) => {
		const { doctorCode, edit1, edit2 } = params;
		const apiPath = `${API_PATH.GET_DOCTOR_HISOTRY_COMPARE_LIST}?doctorCode=${doctorCode}&edit1=${edit1}&edit2=${edit2}`;
		try {
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getDoctorCompareHistoryFilter = createAsyncThunk(
	"Medical/getDoctorCompareHistoryFilter",
	async (doctorCode: string, thunkAPI) => {
		const apiPath = `${API_PATH.GET_DOCTOR_HISOTRY_COMPARE_FILTER}?doctorCode=${doctorCode}`;
		try {
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
