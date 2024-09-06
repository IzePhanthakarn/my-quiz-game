import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
	HospitalForm,
	GetHospitalList,
	ExportPages,
} from "@/modules/hospital/redux/models/hospitalModel";
import { GetHospitalSp7List } from "@/modules/hospital/redux/models/sp7Model";
import { GetHospitalSp19List } from "@/modules/hospital/redux/models/sp19Model";
import { GetHospitalEtcFilesList } from "../redux/models/etcFilesModel";
import { GetHospitalAttachmentList } from "../redux/models/attachmentModel";

export const getHospitalDetail = createAsyncThunk(
	"Hospital/getHospitalDetail",
	async (uuid: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getHospitalSp7List = createAsyncThunk(
	"Hospital/Sp7/List",

	async (body: GetHospitalSp7List, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP7.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getHospitalSp7ListByHospitalUuid = createAsyncThunk(
	"Hospital/Sp7/List",

	async (body: GetHospitalSp7List, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP7.GET_LIST_BY_HOSPITAL_UUID}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getHospitalSp19ListByHospitalUuid = createAsyncThunk(
	"Hospital/Sp19/List",

	async (body: GetHospitalSp19List, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP19.GET_LIST_BY_HOSPITAL_UUID}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getHospitalEtcFilesListByHospitalUuid = createAsyncThunk(
	"Hospital/EtcFiles/List",

	async (body: GetHospitalEtcFilesList, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ETC_FILES.GET_LIST_BY_HOSPITAL_UUID}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getHospitalAttachmentListByHospitalWcfCodeAndFieldName =
	createAsyncThunk(
		"Hospital/Attachment/List",

		async (body: GetHospitalAttachmentList, thunkAPi) => {
			try {
				const apiPath = `${API_PATH.HOSPITAL.ATTACHMENT.GET_LIST_BY_HOSPITAL_WCF_CODE_AND_FIELD_NAME}`;
				const response = await axios.post(apiPath, body);
				return response.data;
			} catch (err) {
				return thunkAPi.rejectWithValue("");
			}
		}
	);

export const updateHospitalApi = createAsyncThunk(
	"Hospital/updateHospitalApi",
	async (
		body: {
			body: {
				hospitalPatch: HospitalForm;
				sp7: HospitalForm["files"]["sp7"];
				sp19: HospitalForm["files"]["sp19"];
				etcFiles: HospitalForm["files"]["etcFiles"];
				certificateOfIncorporation: HospitalForm["files"]["certificateOfIncorporation"];
			};
			uuid: HospitalForm["uuid"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
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
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP7.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const updateHospitalSp19Api = createAsyncThunk(
	"Hospital/updateHospitalSp19Api",
	async (
		body: {
			body: {
				isActive: string;
			};
			uuid: HospitalForm["uuid"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.SP19.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const updateHospitalEtcFilesApi = createAsyncThunk(
	"Hospital/updateHospitalEtcFilesApi",
	async (
		body: {
			body: {
				isActive: string;
			};
			uuid: HospitalForm["uuid"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ETC_FILES.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getHospitalList = createAsyncThunk(
	"Hospital/getHospitalList",
	async (body: GetHospitalList, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const addHospitalAPI = createAsyncThunk(
	"Hospital/addHospitalAPI",
	async (
		body: {
			hospitalCreate: HospitalForm;
			sp7: HospitalForm["files"]["sp7"];
			sp19: HospitalForm["files"]["sp19"];
			etcFiles: HospitalForm["files"]["etcFiles"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const exportMed5008Api = createAsyncThunk(
	"Hospital/exportMed5008Api",
	async (body: ExportPages["med5008"], thunkAPi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.EXPORT_PAGES.MED5008}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const handleUploadSp7HospitalApi = createAsyncThunk(
	"Hospital/handleUploadSp7HospitalApi",
	async (body: FormData, thunkApi) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.UPLOAD_SP7}`;
			const response = await axios.post(apiPath, body, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (err) {
			return thunkApi.rejectWithValue("");
		}
	}
);
