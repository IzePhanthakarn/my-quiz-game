import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { GetOrganSystemWpiList, OrganSystemWpiForm } from "../redux/model";

export const getOrganList = createAsyncThunk(
	"Medical/getOrganList",
	async (body: GetOrganSystemWpiList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.GET_ORGAN_SYSTEM_WPI_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getOrganRecord = createAsyncThunk(
	"Medical/getOrganRecord",
	async (uuid: number, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.GET_ORGAN_SYSTEM_WPI_RECORD}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addOrganSystemWpiAPI = createAsyncThunk(
	"Medical/addOrganSystemWpiAPI",
	async (body: OrganSystemWpiForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getOrganSystemWpiDetail = createAsyncThunk(
	"Medical/getOrganSystemWpiDetail",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateOrganSystemWpiApi = createAsyncThunk(
	"Medical/updateOrganSystemWpiApi",
	async (
		body: {
			body: OrganSystemWpiForm;
			uuid: OrganSystemWpiForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
