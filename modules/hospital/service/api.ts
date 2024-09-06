import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { HospitalForm, GetHospitalList, ExportPages } from "../redux/model";
import { GetHospitalSp7List } from "../redux/sp7model";

export const getHospitalDetail = createAsyncThunk(
	"Hospital/getHospitalDetail",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getHospitalSp7List = createAsyncThunk(
	"Hospital/Sp7/List",

	async (body: GetHospitalSp7List, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP7.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getHospitalSp7ListByHospitalUuid = createAsyncThunk(
	"Hospital/Sp7/List",

	async (body: GetHospitalSp7List, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP7.GET_LIST_BY_HOSPITAL_UUID}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateHospitalApi = createAsyncThunk(
	"Hospital/updateHospitalApi",
	async (
		body: {
			body: { hospitalPatch: HospitalForm; sp7: HospitalForm["files"]["sp7"] };
			uuid: HospitalForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateHospitalSp7Api = createAsyncThunk(
	"Hospital/updateHospitalSp7Api",
	async (
		body: {
			body: {
				isActive: string;
			};
			uuid: HospitalForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP7.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getHospitalList = createAsyncThunk(
	"Hospital/getHospitalList",
	async (body: GetHospitalList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addHospitalAPI = createAsyncThunk(
	"Hospital/addHospitalAPI",
	async (
		body: { hospitalCreate: HospitalForm; sp7: HospitalForm["files"]["sp7"] },
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const exportMed5008Api = createAsyncThunk(
	"Hospital/exportMed5008Api",
	async (body: ExportPages["med5008"], thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.EXPORT_PAGES.MED5008}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const handleUploadSp7HospitalApi = createAsyncThunk(
	"Hospital/handleUploadSp7HospitalApi",
	async (body: FormData, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.UPLOAD_SP7}`;
			const response = await axios.post(apiPath, body, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const exportExcelMed5012 = createAsyncThunk(
	"Hospital/exportMed5012Api",
	async (body: ExportPages["med5012"], thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.EXPORT_PAGES.MED5012}`;
			const response = await axios.post(apiPath, body, {
				responseType: "arraybuffer",
			});
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const exportPdfMed5012 = createAsyncThunk(
	"Hospital/exportMed5012Api",
	async (body: ExportPages["med5012"], thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.EXPORT_PDF.MED5012}`;
			const response = await axios.post(apiPath, body, {
				responseType: "arraybuffer",
			});
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
