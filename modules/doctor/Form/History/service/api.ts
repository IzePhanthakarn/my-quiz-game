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

export const getDoctorCompareRelationHistoryList = createAsyncThunk(
	"Medical/getDoctorCompareRelationHistoryList",
	async (params: CompareParams, thunkAPI) => {
		const { doctorCode, olderVersion, newerVersion } = params;
		const apiPath = `${API_PATH.GET_DOCTOR_HISOTRY_COMPARE_RELATION_LIST}?doctorCode=${doctorCode}&olderVersion=${olderVersion}&newerVersion=${newerVersion}`;
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
	async (doctorCode: string, thunkAPI) => {
		const apiPath = `${API_PATH.GET_DOCTOR_HISOTRY_COMPARE_ALL}?doctorCode=${doctorCode}`;
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
