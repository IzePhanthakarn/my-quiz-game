import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setClinicDetail, setClinicGrid, setTotalData } from "../redux";
import { ClinicList } from "../redux/master/model";
import { ClinicDetail } from "../redux/model";
import {
	modelPaginationOptions,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import _ from "lodash";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { handleEmptyStringToNull } from "@/utils";
import { setIsLoading } from "@/redux/slices/container";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import {
	setIsOpenBaseConfirmDialog,
	setIsOpenDialog,
} from "@/redux/slices/dialog";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import { BaseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";

interface ClinicGridParams {
	pagination: PaginationOptions;
	clinicCodeLike: string | null;
	clinicNameLike: string | null;
}

export interface ClinicPagination extends ClinicGridParams {
	isActive: IsActive | undefined;
}

export const clinicPagination: ClinicPagination = {
	pagination: modelPaginationOptions,
	clinicCodeLike: "",
	clinicNameLike: "",
	isActive: undefined,
};

export const getClinicList = createAsyncThunk(
	"Medical/getClinicDetail",
	async (params: ClinicPagination, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.GET_CLINIC_PAGE}`;
			const response = await axios.post(apiPath, params);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getClinicDetail = createAsyncThunk(
	"Medical/getClinicDetail",
	async (id: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.GET_CLINIC_DETAIL}/${id}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const initGetClinicDetail =
	(params: UuidFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getClinicDetail(`${uuid}`));
			dispatch(setClinicDetail(response.payload));
		}
	};

export const initClinicGrid =
	(params: ClinicPagination) => async (dispatch: AppDispatch) => {
		const newParams = {
			...params,
			clinicCodeLike: handleEmptyStringToNull(params.clinicCodeLike),
			clinicNameLike: handleEmptyStringToNull(params.clinicNameLike),
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
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.CREATE_CLINIC}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
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
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
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
			uuid: ClinicDetail["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.UPDATE_CLINIC}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
export const updateClinic =
	(clinicDetail: ClinicDetail, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateClinicApi({
				uuid: clinicDetail.uuid,
				body: {
					clinicName: clinicDetail.clinicName,
					isActive: clinicDetail.isActive,
				},
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.PATCH_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.CLINIC.link);
		}
	};
