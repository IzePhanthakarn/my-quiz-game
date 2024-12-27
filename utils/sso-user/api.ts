import { createAsyncThunk } from "@reduxjs/toolkit";
import API_PATH from "@/constants/api";
import axios from "axios";

export const getUmsSsoUser = createAsyncThunk(
	"UMS/getSsoUser",
	async (login: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.SSO_USER}?login=${login}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
