import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { EstimateAddFilter } from "../../../redux/models/hospitalModel";

export const getHospitalEstimateList = createAsyncThunk(
	"Hospital/Estimate/getHospitalEstimateList",
	async (filter: EstimateAddFilter, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ESTIMATE.LIST}`;
			const response = await axios.post(apiPath, filter);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getHospitalEstimateDetail = createAsyncThunk(
	"Hospital/Estimate/getHospitalEstimateDetail",
	async (_, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ESTIMATE.DETAIL}`;
			const response = await axios.post(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
