import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { DoctorPagination } from ".";

export const getDoctorList = createAsyncThunk(
	"Medical/getDoctorDetail",
	async (params: DoctorPagination, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_DOCTOR_PAGE}`;
			const response = await axios.post(apiPath, params);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getDoctorForm = createAsyncThunk(
	"Medical/getDoctorForm",
	async (id: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_DOCTOR_FORM}/${id}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
