import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
	HospitalAnnouncedPriceFileCategoryDetailForm,
	GetHospitalAnnouncedPriceFileCategoryDetailList,
} from "../redux/model";

export const getHospitalAnnouncedPriceFileCategoryDetailDetail =
	createAsyncThunk(
		"Medical/getHospitalAnnouncedPriceFileCategoryDetailDetail",
		async (uuid: string, thunkAPI) => {
			try {
				const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_FILE_CATEGORY_DETAIL.GET_BY_UUID}/${uuid}`;
				const response = await axios.get(apiPath);
				return response.data;
			} catch (err) {
				return thunkAPI.rejectWithValue(err);
			}
		}
	);

export const updateHospitalAnnouncedPriceFileCategoryDetailApi =
	createAsyncThunk(
		"Medical/updateHospitalAnnouncedPriceFileCategoryDetailApi",
		async (
			body: {
				body: HospitalAnnouncedPriceFileCategoryDetailForm;
				uuid: HospitalAnnouncedPriceFileCategoryDetailForm["uuid"];
			},
			thunkAPI
		) => {
			try {
				const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_FILE_CATEGORY_DETAIL.UPDATE_BY_UUID}/${body.uuid}`;
				const response = await axios.patch(apiPath, body.body);
				return response.data;
			} catch (err) {
				return thunkAPI.rejectWithValue(err);
			}
		}
	);

export const getHospitalAnnouncedPriceFileCategoryDetailList = createAsyncThunk(
	"Medical/getHospitalAnnouncedPriceFileCategoryDetailList",
	async (body: GetHospitalAnnouncedPriceFileCategoryDetailList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_FILE_CATEGORY_DETAIL.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const addHospitalAnnouncedPriceFileCategoryDetailAPI = createAsyncThunk(
	"Medical/addHospitalAnnouncedPriceFileCategoryDetailAPI",
	async (body: HospitalAnnouncedPriceFileCategoryDetailForm, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_FILE_CATEGORY_DETAIL.ADD}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
