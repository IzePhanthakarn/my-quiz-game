import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
	HospitalAnnouncedPriceDetailCategoryMasterForm,
	GetHospitalAnnouncedPriceDetailCategoryMasterList,
} from "../redux/model";

export const getHospitalAnnouncedPriceDetailCategoryMasterDetail =
	createAsyncThunk(
		"Medical/getHospitalAnnouncedPriceDetailCategoryMasterDetail",
		async (uuid: string, thunkAPI) => {
			try {
				const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER.GET_BY_UUID}/${uuid}`;
				const response = await axios.get(apiPath);
				return response.data;
			} catch (err) {
				return thunkAPI.rejectWithValue(err);
			}
		}
	);

export const updateHospitalAnnouncedPriceDetailCategoryMasterApi =
	createAsyncThunk(
		"Medical/updateHospitalAnnouncedPriceDetailCategoryMasterApi",
		async (
			body: {
				body: HospitalAnnouncedPriceDetailCategoryMasterForm;
				uuid: HospitalAnnouncedPriceDetailCategoryMasterForm["uuid"];
			},
			thunkAPI
		) => {
			try {
				const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER.UPDATE_BY_UUID}/${body.uuid}`;
				const response = await axios.patch(apiPath, body.body);
				return response.data;
			} catch (err) {
				return thunkAPI.rejectWithValue(err);
			}
		}
	);

export const getHospitalAnnouncedPriceDetailCategoryMasterList =
	createAsyncThunk(
		"Medical/getHospitalAnnouncedPriceDetailCategoryMasterList",
		async (
			body: GetHospitalAnnouncedPriceDetailCategoryMasterList,
			thunkAPI
		) => {
			try {
				const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER.GET_LIST}`;
				const response = await axios.post(apiPath, body);
				return response.data;
			} catch (err) {
				return thunkAPI.rejectWithValue(err);
			}
		}
	);

export const addHospitalAnnouncedPriceDetailCategoryMasterAPI =
	createAsyncThunk(
		"Medical/addHospitalAnnouncedPriceDetailCategoryMasterAPI",
		async (body: HospitalAnnouncedPriceDetailCategoryMasterForm, thunkAPI) => {
			try {
				const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER.ADD}`;
				const response = await axios.post(apiPath, body);
				return response.data;
			} catch (err) {
				return thunkAPI.rejectWithValue(err);
			}
		}
	);
