import { createAsyncThunk } from "@reduxjs/toolkit/react";
import API_PATH from "../../../constants/api";
import axios from "axios";

export const minioUpload = createAsyncThunk(
	"Medical/minioUpload",
	async (body: FormData, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.MINIO.UPLOAD}`;
			const response = await axios.post(apiPath, body, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const minioUploadMultiple = createAsyncThunk(
	"Medical/minioUploadMultiple",
	async (body: FormData, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.MINIO.UPLOAD_MULTIPLE}`;
			const response = await axios.post(apiPath, body, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const minioDownload = createAsyncThunk(
	"Medical/minioDownload",
	async (fileName: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.MINIO.DOWNLOAD}${fileName}`;
			const response = await axios.get(apiPath, {
				responseType: "blob", // Set response type to blob for binary data
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));

			return { url, fileName };
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
