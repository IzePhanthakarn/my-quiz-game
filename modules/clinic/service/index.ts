import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setClinicDetail, setClinicGrid, setTotalData } from "../redux";
import { ClinicList } from "../redux/master/model";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import { ClinicDetail } from "../redux/model";
import {
	modelPaginationOptions,
	PaginationOptions,
	SortOrdersModel,
} from "@/components/Pagination/redux/model";
import _ from "lodash";
import { IsActive } from "@/constants/constants";
import { handleEmptyStringToNull } from "@/utils";
import { setIsLoading } from "@/components/Loading/redux";
import { NextRouter } from "next/router";
import { LINKS } from "../../../constants/links";
import { redirect } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ClinicGridParams {
	pagination: PaginationOptions;
	clinicCode: string | null;
	clinicName: string | null;
}

export interface ClinicPagination extends ClinicGridParams {
	isActive: IsActive | null;
}

export const clinicPagination: ClinicPagination = {
	pagination: modelPaginationOptions,
	clinicCode: "",
	clinicName: "",
	isActive: null,
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
		const { uuid } = params.params;
		const response = await dispatch(getClinicDetail(uuid));
		dispatch(setClinicDetail(response.payload));
	};

export const initClinicGrid =
	(params: ClinicPagination) => async (dispatch: AppDispatch) => {
		const newParams = {
			...params,
			clinicCode: handleEmptyStringToNull(params.clinicCode),
			clinicName: handleEmptyStringToNull(params.clinicName),
		};
		dispatch(setIsLoading(true));
		const data = await dispatch(getClinicList(newParams));
		dispatch(setIsLoading(false));
		const grid = data.payload.content.map((data: ClinicList, index: number) => {
			return {
				id: index,
				clinicCode: data.clinicCode,
				clinicName: data.clinicName,
				uuid: data.uuid,
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
			isActive: ClinicDetail["isActive"];
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
	(clinicDetail: ClinicDetail, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			createClinicApi({
				clinicCode: clinicDetail.clinicCode,
				clinicName: clinicDetail.clinicName,
				isActive: clinicDetail.isActive,
			})
		);
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			router.push(LINKS.CLINIC.link);
		}
	};

export const updateClinicApi = createAsyncThunk(
	"Medical/updateClinicApi",
	async (
		body: {
			body: {
				clinicName: ClinicDetail["clinicName"];
				isActive: ClinicDetail["isActive"];
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
				body: {
					clinicName: clinicDetail.clinicName,
					isActive: clinicDetail.isActive,
				},
			})
		);
	};
