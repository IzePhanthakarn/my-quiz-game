import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
	EstimateAddFilter,
	EstimateAddForm,
	GetEstimateAddList,
} from "../../../redux/models/hospitalModel";

export const getHospitalEstimateList = createAsyncThunk(
	"Hospital/Estimate/getHospitalEstimateList",
	async (filter: GetEstimateAddList, thunkAPI) => {
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
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ESTIMATE.DETAIL}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const insertHospitalAssessmentApi = createAsyncThunk(
	"Hospital/HospitalAssessment/insertHospitalAssessmentApi",
	async (body: EstimateAddForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ESTIMATE.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateHospitalAssessmentApi = createAsyncThunk(
	"Hospital/HospitalAssessment/updateHospitalAssessmentApi",
	async (
		body: {
			form: EstimateAddForm;
			uuid: string;
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ESTIMATE.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, {
				hospitalAssessmentPatch: body.form,
				addNewHospitalAssessmentFiles: body.form.addNewHospitalAssessmentFiles,
				hospitalAssessmentFilesUuidDeleteList:
					body.form.hospitalAssessmentFilesUuidDeleteList,
			});
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
