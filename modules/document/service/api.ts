import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { DocumentForm, GetDocumentList } from "../redux/model";

export const getDocumentDetail = createAsyncThunk(
	"Medical/getDocumentDetail",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.DOCUMENT.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateDocumentApi = createAsyncThunk(
	"Medical/updateDocumentApi",
	async (
		body: {
			body: DocumentForm;
			uuid: DocumentForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.DOCUMENT.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getDocumentList = createAsyncThunk(
	"Medical/getDocumentList",
	async (body: GetDocumentList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.DOCUMENT.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addDocumentAPI = createAsyncThunk(
	"Medical/addDocumentAPI",
	async (body: DocumentForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.DOCUMENT.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
