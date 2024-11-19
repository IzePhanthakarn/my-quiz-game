import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { DoctorPagination } from ".";
import { DoctorForm } from "../redux/form/model";
import { importFile } from "../Upload/service";

export const getDoctorList = createAsyncThunk(
	"Medical/getDoctorDetail",
	async (params: DoctorPagination, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.GET_DOCTOR_PAGE}`;
			const response = await axios.post(apiPath, params);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getDoctorForm = createAsyncThunk(
	"Medical/getDoctorForm",
	async (id: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.GET_DOCTOR_FORM}/${id}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateDoctorForm = createAsyncThunk(
	"Medical/updateDoctorForm",
	async (data: { params: DoctorForm; uuid: string }, thunkAPI) => {
		try {
			const { params, uuid } = data;
			const apiPath = `${API_PATH.UPDATE_DOCTOR}/${uuid}`;
			const response = await axios.patch(apiPath, params);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const createDoctorForm = createAsyncThunk(
	"Medical/createDoctorForm",
	async (params: DoctorForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.CREATE_DOCTOR}`;
			const response = await axios.post(apiPath, params);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const importDoctorXlsx = createAsyncThunk(
	"Medical/importDoctorXlsx",
	async (params: importFile, thunkAPI) => {
		try {
			const formData = new FormData();

			if (params.file[0]?.originFileObj) {
				formData.append("file", params.file[0].originFileObj);
			}

			formData.append("isPreview", params.isPreview.toString());
			formData.append("page", params.page.pageNumber.toString());
			formData.append("size", params.page.pageSize.toString());

			const apiPath = `${API_PATH.IMPORT_DOCTOR_XLSX}`;
			const response = await axios.post(apiPath, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			if (_.get(response, "error.message") === "Rejected") {
				return;
			}

			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
