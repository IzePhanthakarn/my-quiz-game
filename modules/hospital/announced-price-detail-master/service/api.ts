import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
	HospitalAnnouncedPriceDetailMasterForm,
	GetHospitalAnnouncedPriceDetailMasterList,
} from "../redux/model";

export const getHospitalAnnouncedPriceDetailMasterDetail = createAsyncThunk(
	"Medical/getHospitalAnnouncedPriceDetailMasterDetail",
	async (uuid: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_DETAIL_MASTER.GET_BY_UUID}/${uuid}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateHospitalAnnouncedPriceDetailMasterApi = createAsyncThunk(
	"Medical/updateHospitalAnnouncedPriceDetailMasterApi",
	async (
		body: {
			body: HospitalAnnouncedPriceDetailMasterForm;
			uuid: HospitalAnnouncedPriceDetailMasterForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_DETAIL_MASTER.UPDATE_BY_UUID}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getHospitalAnnouncedPriceDetailMasterList = createAsyncThunk(
	"Medical/getHospitalAnnouncedPriceDetailMasterList",
	async (body: GetHospitalAnnouncedPriceDetailMasterList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_DETAIL_MASTER.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addHospitalAnnouncedPriceDetailMasterAPI = createAsyncThunk(
	"Medical/addHospitalAnnouncedPriceDetailMasterAPI",
	async (body: HospitalAnnouncedPriceDetailMasterForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_DETAIL_MASTER.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
