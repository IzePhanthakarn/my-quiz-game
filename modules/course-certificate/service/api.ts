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
	async (uuid: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_CERTIFICATE.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
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
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.COURSE_CERTIFICATE.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getCourseCertificateList = createAsyncThunk(
	"Medical/getCourseCertificateList",
	async (body: GetCourseCertificateList, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_CERTIFICATE.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const addCourseCertificateAPI = createAsyncThunk(
	"Medical/addCourseCertificateAPI",
	async (body: CourseCertificateForm, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_CERTIFICATE.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
