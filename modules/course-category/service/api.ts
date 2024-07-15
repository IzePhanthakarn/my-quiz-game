import { PaginationOptions } from "@/components/Pagination/redux/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { CourseCategoryForm } from "../redux/model";

export interface GetCourseListBody {
	courseCategoryId: string;
	categoryDescription: string;
	pagination: PaginationOptions;
}

export const getCourseList = createAsyncThunk(
	"Medical/getCourseList",
	async (body: GetCourseListBody, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_CATEGORT.GET_COURSE_CATEGORY_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const addCourseCategoryList = createAsyncThunk(
	"Medical/addCourseCategoryList",
	async (body: CourseCategoryForm, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_CATEGORT.ADD_COURSE_CATEGORY}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getCourseCategoryDetail = createAsyncThunk(
	"Medical/getCourseCategoryDetail",
	async (uuid: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE_CATEGORT.GET_COURSE_CATEGORY_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const updateCourseCategoryApi = createAsyncThunk(
	"Medical/updateCourseCategoryApi",
	async (
		body: {
			body: CourseCategoryForm;
			uuid: CourseCategoryForm["uuid"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.COURSE_CATEGORT.UPDATE_COURSE_CATEGORY_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
