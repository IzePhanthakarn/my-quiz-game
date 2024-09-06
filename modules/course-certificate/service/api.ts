import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
	CourseCertificateForm,
	GetCourseCertificateList,
} from "../redux/model";

export const getCourseCertificateDetail = createAsyncThunk(
	"Medical/getCourseCertificateDetail",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.COURSE_CERTIFICATE.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateCourseCertificateApi = createAsyncThunk(
	"Medical/updateCourseCertificateApi",
	async (
		body: {
			body: CourseCertificateForm;
			uuid: CourseCertificateForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.COURSE_CERTIFICATE.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getCourseCertificateList = createAsyncThunk(
	"Medical/getCourseCertificateList",
	async (body: GetCourseCertificateList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.COURSE_CERTIFICATE.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addCourseCertificateAPI = createAsyncThunk(
	"Medical/addCourseCertificateAPI",
	async (body: CourseCertificateForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.COURSE_CERTIFICATE.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
