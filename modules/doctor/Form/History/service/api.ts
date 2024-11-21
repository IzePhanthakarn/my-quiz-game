import API_PATH from "@/constants/api";
import { CompareParams } from "@/modules/doctor/redux/history/model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDoctorCompareHistoryList = createAsyncThunk(
	"Medical/getDoctorCompareHistoryList",
	async (params: CompareParams, thunkAPI) => {
		const { doctorId, olderVersion, newerVersion } = params;
		const apiPath = `${API_PATH.GET_DOCTOR_HISOTRY_COMPARE_LIST}?doctorId=${doctorId}&olderVersion=${olderVersion}&newerVersion=${newerVersion}`;
		try {
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getDoctorCompareAllHistoryList = createAsyncThunk(
	"Medical/getDoctorCompareAllHistoryList",
	async (doctorId: number, thunkAPI) => {
		const apiPath = `${API_PATH.GET_DOCTOR_HISOTRY_COMPARE_ALL}?doctorId=${doctorId}`;
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
	async (doctorId: number, thunkAPI) => {
		const apiPath = `${API_PATH.GET_DOCTOR_HISOTRY_COMPARE_FILTER}?doctorId=${doctorId}`;
		try {
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
