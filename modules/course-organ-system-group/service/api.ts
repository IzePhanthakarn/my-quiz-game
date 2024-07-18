import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
	CourseOrganSystemGroupForm,
	GetCourseOrganSystemGroupList,
} from "../redux/model";

export const getCourseOrganSystemGroupDetail = createAsyncThunk(
	"Medical/getCourseOrganSystemGroupDetail",
	async (uuid: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_ORGAN_SYSTEM_GROUP.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
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
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.COURSE_ORGAN_SYSTEM_GROUP.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getCourseOrganSystemGroupList = createAsyncThunk(
	"Medical/getCourseOrganSystemGroupList",
	async (body: GetCourseOrganSystemGroupList, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_ORGAN_SYSTEM_GROUP.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const addCourseOrganSystemGroupAPI = createAsyncThunk(
	"Medical/addCourseOrganSystemGroupAPI",
	async (body: CourseOrganSystemGroupForm, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_ORGAN_SYSTEM_GROUP.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
