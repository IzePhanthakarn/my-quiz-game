import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { MedicalAmountForm, GetMedicalAmountList } from "../redux/model";

export const getMedicalAmountDetail = createAsyncThunk(
	"Medical/getMedicalAmountDetail",
	async (uuid: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.MEDICAL_AMOUNT.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
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
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.MEDICAL_AMOUNT.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getMedicalAmountList = createAsyncThunk(
	"Medical/getMedicalAmountList",
	async (body: GetMedicalAmountList, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.MEDICAL_AMOUNT.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const addMedicalAmountAPI = createAsyncThunk(
	"Medical/addMedicalAmountAPI",
	async (body: MedicalAmountForm, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.MEDICAL_AMOUNT.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
