import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setClinicDetail, setClinicGrid, setTotalData } from "../redux";
import { ClinicForm, ClinicList, modelClinicForm } from "../redux/master/model";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import { ClinicDetail } from "../redux/model";
import {
	modelPaginationOptions,
	PaginationOptions,
} from "@/components/Pagination/redux/model";

export interface ClinicPagination {
	pagination: PaginationOptions;
	data: ClinicForm;
}

export const clinicPagination: ClinicPagination = {
	pagination: modelPaginationOptions,
	data: modelClinicForm,
};

export const getClinicList = createAsyncThunk(
	"Medical/getClinicDetail",
	async (params: ClinicPagination = clinicPagination, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_CLINIC_PAGE}`;
			const response = await axios.post(apiPath, params);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getClinicDetail = createAsyncThunk(
	"Medical/getClinicDetail",
	async (id: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_CLINIC_DETAIL}/${id}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const initGetClinicDetail =
	(params: ClinicFormPageProps) => async (dispatch: AppDispatch) => {
		const { id } = params.params;
		const response = await dispatch(getClinicDetail(id));
		dispatch(setClinicDetail(response.payload));
	};

export const initClinicGrid =
	(params: ClinicPagination = clinicPagination) =>
	async (dispatch: AppDispatch) => {
		console.log("paramsparams", params);
		const data = await dispatch(getClinicList(params));
		const grid = data.payload.content.map((data: ClinicList, index: number) => {
			return {
				id: index,
				clinicCode: data.clinicCode,
				clinicName: data.clinicName,
				isActive: data.isActive,
			};
		});
		const totalData = data.payload.totalElements;
		dispatch(setTotalData(totalData));
		dispatch(setClinicGrid(grid));
	};

export const handleConfirmFilter =
	(onConfirmClick?: () => void) => (dispatch: AppDispatch) => {
		if (onConfirmClick) onConfirmClick();
		dispatch(setIsOpenDrawer(false));
	};

export const createClinicApi = createAsyncThunk(
	"Medical/createClinicApi",
	async (
		body: {
			clinicCode: ClinicDetail["clinicCode"];
			clinicName: ClinicDetail["clinicName"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.CREATE_CLINIC}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
export const addClinic =
	(clinicDetail: ClinicDetail) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			createClinicApi({
				clinicCode: clinicDetail.clinicCode,
				clinicName: clinicDetail.clinicName,
			})
		);
	};

export const updateClinicApi = createAsyncThunk(
	"Medical/updateClinicApi",
	async (
		body: {
			body: {
				clinicName: ClinicDetail["clinicName"];
			};
			clinicCode: ClinicDetail["clinicCode"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.UPDATE_CLINIC}/${body.clinicCode}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
export const updateClinic =
	(clinicDetail: ClinicDetail) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateClinicApi({
				clinicCode: clinicDetail.clinicCode,
				body: { clinicName: clinicDetail.clinicName },
			})
		);
	};
