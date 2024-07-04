import { PaginationOptions } from "@/components/Pagination/redux/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";

export interface GetCourseListBody {
	courseCategoryId: string;
	categoryDescription: string;
	pagination: PaginationOptions;
}

export const getCourseList = createAsyncThunk(
	"Medical/getCourseList",
	async (body: GetCourseListBody, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.COURSE.GET_COURSE_CATEGORY_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
