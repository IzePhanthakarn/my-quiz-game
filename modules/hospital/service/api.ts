import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { HospitalForm, GetHospitalList, ExportPages } from "../redux/model";

export const getHospitalDetail = createAsyncThunk(
	"Hospital/getHospitalDetail",
	async (uuid: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const updateHospitalApi = createAsyncThunk(
	"Hospital/updateHospitalApi",
	async (
		body: {
			body: HospitalForm;
			uuid: HospitalForm["uuid"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getHospitalList = createAsyncThunk(
	"Hospital/getHospitalList",
	async (body: GetHospitalList, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const addHospitalAPI = createAsyncThunk(
	"Hospital/addHospitalAPI",
	async (body: HospitalForm, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const exportMed5008Api = createAsyncThunk(
	"Hospital/exportMed5008Api",
	async (body: ExportPages["med5008"], thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.EXPORT_PAGES.MED5008}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
