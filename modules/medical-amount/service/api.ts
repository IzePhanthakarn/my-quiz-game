import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { MedicalAmountForm, GetMedicalAmountList } from "../redux/model";

export const getMedicalAmountDetail = createAsyncThunk(
	"Medical/getMedicalAmountDetail",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.MEDICAL_AMOUNT.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateMedicalAmountApi = createAsyncThunk(
	"Medical/updateMedicalAmountApi",
	async (
		body: {
			body: MedicalAmountForm;
			uuid: MedicalAmountForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.MEDICAL_AMOUNT.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getMedicalAmountList = createAsyncThunk(
	"Medical/getMedicalAmountList",
	async (body: GetMedicalAmountList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.MEDICAL_AMOUNT.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addMedicalAmountAPI = createAsyncThunk(
	"Medical/addMedicalAmountAPI",
	async (body: MedicalAmountForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.MEDICAL_AMOUNT.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
