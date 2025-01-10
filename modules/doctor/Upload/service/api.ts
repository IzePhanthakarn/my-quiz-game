import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTemplateDoctor = createAsyncThunk(
	"Medical/getTemplate",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(`${API_PATH.GET_DOCTOR_TEMPLATE}`, {
				responseType: "blob", // Important to handle binary data
			});
			return response.data; // Return the binary data only
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
