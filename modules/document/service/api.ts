import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { DocumentForm, GetDocumentList } from "../redux/model";

export const getDocumentDetail = createAsyncThunk(
	"Medical/getDocumentDetail",
	async (uuid: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.DOCUMENT.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
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
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.DOCUMENT.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getDocumentList = createAsyncThunk(
	"Medical/getDocumentList",
	async (body: GetDocumentList, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.DOCUMENT.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const addDocumentAPI = createAsyncThunk(
	"Medical/addDocumentAPI",
	async (body: DocumentForm, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.DOCUMENT.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
