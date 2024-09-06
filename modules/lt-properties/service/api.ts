import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { LtPropertiesForm, GetLtPropertiesList } from "../redux/model";

export const getLtPropertiesDetail = createAsyncThunk(
	"Medical/getLtPropertiesDetail",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.LT_PROPERTIES.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateLtPropertiesApi = createAsyncThunk(
	"Medical/updateLtPropertiesApi",
	async (
		body: {
			body: LtPropertiesForm;
			uuid: LtPropertiesForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.LT_PROPERTIES.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getLtPropertiesList = createAsyncThunk(
	"Medical/getLtPropertiesList",
	async (body: GetLtPropertiesList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.LT_PROPERTIES.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addLtPropertiesAPI = createAsyncThunk(
	"Medical/addLtPropertiesAPI",
	async (body: LtPropertiesForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.LT_PROPERTIES.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
