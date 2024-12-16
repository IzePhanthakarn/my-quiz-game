import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { HospitalForm } from "../../../redux/models/hospitalModel";
import { FetchHospitalHistory } from "../../../redux/models/historyModel";

export const fetchHospitalHistoryApi = createAsyncThunk(
	"Hospital/History/fetchHospitalHistory",
	async (
		body: {
			body: FetchHospitalHistory;
			uuid: HospitalForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.HISTORY.COMPARE_VERSION}/${body.uuid}`;
			const response = await axios.post(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const fetchAnnouncedPriceFilesHistoryApi = createAsyncThunk(
	"Hospital/History/fetchAnnouncedPriceFilesHistoryApi",
	async (
		body: {
			body: FetchHospitalHistory;
			uuid: HospitalForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.HISTORY.COMPARE_ANNOUNCED_PRICE_FILES_VERSION}/${body.uuid}`;
			const response = await axios.post(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getEditTimesListApi = createAsyncThunk(
	"Hospital/History/getEditTimesList",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.HISTORY.EDIT_TIMES_LIST}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getEditTimesAnnouncedPriceFilesHistoryListApi = createAsyncThunk(
	"Hospital/History/getEditTimesAnnouncedPriceFilesHistoryListApi",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.HISTORY.EDIT_TIMES_ANNOUNCED_PRICE_FILES_HISTORY_LIST}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
