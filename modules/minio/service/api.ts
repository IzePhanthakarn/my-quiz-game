import { createAsyncThunk } from "@reduxjs/toolkit/react";
import API_PATH from "../../../constants/api";
import axios from "axios";

// export const minioUpload = createAsyncThunk(
// 	"Medical/minioUpload",
// 	async (body: any, thunkAPi) => {
// 		try {
// 			const apiPath = `${API_PATH.MINIO.UPLOAD}`;
// 			const response = await axios.post(apiPath, body);
// 			return response.data;
// 		} catch (err) {
// 			return thunkAPi.rejectWithValue("");
// 		}
// 	}
// );

export const minioUpload = createAsyncThunk(
	"Medical/minioUpload",
	async (body: FormData, thunkApi) => {
		try {
			const apiPath = `${API_PATH.MINIO.UPLOAD}`;
			const response = await axios.post(apiPath, body, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (err) {
			// return thunkApi.rejectWithValue(err.response?.data || "Upload failed");
			return thunkApi.rejectWithValue("");
		}
	}
);

export const minioDownload = createAsyncThunk(
	"Medical/minioDownload",
	async (fileName: string, thunkApi) => {
		try {
			const apiPath = `${API_PATH.MINIO.DOWNLOAD}${fileName}`;
			const response = await axios.get(apiPath, {
				// headers: {
				// 	"Content-Type": "multipart/form-data",
				// },
				responseType: "blob", // Set response type to blob for binary data
			});
			// return response.data;
			// Create a URL for the Blob object
			const url = window.URL.createObjectURL(new Blob([response.data]));

			// Return URL and filename for use in the component
			return { url, fileName };
		} catch (err) {
			return thunkApi.rejectWithValue("");
		}
	}
);
