import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { GetOrganSystemWpiList, OrganSystemWpiForm } from "../redux/model";

export const getOrganList = createAsyncThunk(
	"Medical/getOrganList",
	async (body: GetOrganSystemWpiList, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.GET_ORGAN_SYSTEM_WPI_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getOrganRecord = createAsyncThunk(
	"Medical/getOrganRecord",
	async (uuid: number, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.GET_ORGAN_SYSTEM_WPI_RECORD}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const addOrganSystemWpiAPI = createAsyncThunk(
	"Medical/addOrganSystemWpiAPI",
	async (body: OrganSystemWpiForm, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getOrganSystemWpiDetail = createAsyncThunk(
	"Medical/getOrganSystemWpiDetail",
	async (uuid: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
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
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.ORGAN_SYSTEM_WPI.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
