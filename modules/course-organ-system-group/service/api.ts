import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
	CourseOrganSystemGroupForm,
	GetCourseOrganSystemGroupList,
} from "../redux/model";

export const getCourseOrganSystemGroupDetail = createAsyncThunk(
	"Medical/getCourseOrganSystemGroupDetail",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.COURSE_ORGAN_SYSTEM_GROUP.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateCourseOrganSystemGroupApi = createAsyncThunk(
	"Medical/updateCourseOrganSystemGroupApi",
	async (
		body: {
			body: CourseOrganSystemGroupForm;
			uuid: CourseOrganSystemGroupForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.COURSE_ORGAN_SYSTEM_GROUP.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getCourseOrganSystemGroupList = createAsyncThunk(
	"Medical/getCourseOrganSystemGroupList",
	async (body: GetCourseOrganSystemGroupList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.COURSE_ORGAN_SYSTEM_GROUP.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addCourseOrganSystemGroupAPI = createAsyncThunk(
	"Medical/addCourseOrganSystemGroupAPI",
	async (body: CourseOrganSystemGroupForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.COURSE_ORGAN_SYSTEM_GROUP.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
