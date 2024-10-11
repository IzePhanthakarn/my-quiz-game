import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSP7TodoList = createAsyncThunk(
	"Hospital/getSP7TodoList",
	async (date: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP7.TODO_LIST}/${date}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getSP19TodoList = createAsyncThunk(
	"Hospital/getSP19TodoList",
	async (date: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP19.TODO_LIST}/${date}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
