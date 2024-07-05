import { PaginationOptions } from "@/components/Pagination/redux/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";

export interface GetOrganListBody {
	systemId: string;
	organSystemNo: string;
	description: string;
	pagination: PaginationOptions;
}
export const getOrganList = createAsyncThunk(
	"Medical/getOrganList",
	async (body: GetOrganListBody, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.ORGAN.GET_ORGAN_SYSTEM_WPI_LIST}`;
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
			const apiPath = `${API_PATH.ORGAN.GET_ORGAN_SYSTEM_WPI_RECORD}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
