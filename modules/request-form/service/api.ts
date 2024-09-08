import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";

export const getRequestFormByUuid = createAsyncThunk(
	"Medical/getRequestFormByUuid",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.REQUEST_FORM.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateRequestForm = createAsyncThunk(
	"Medical/updateRequestForm",
	async (body: any, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.REQUEST_FORM.UPDATE}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getRequestFormList = createAsyncThunk(
	"Medical/getRequestFormList",
	async (body: any, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.REQUEST_FORM.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const createRequestForm = createAsyncThunk(
	"Medical/createRequestForm",
	async (body: any, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.REQUEST_FORM.CREATE}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
