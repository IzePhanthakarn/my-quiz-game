import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { setDiplomaDetail } from "../redux";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import { setIsLoading } from "@/redux/slices/container";
import { BaseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";
import { DiplomaForm } from "../redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

export const getDiplomaDetail = createAsyncThunk(
	"Medical/getDiplomaDetail",
	async (id: string, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.GET_DIPLOMA_DETAIL}/${id}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const initGetDiplomaDetail =
	(params: UuidFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getDiplomaDetail(`${uuid}`));
			dispatch(setDiplomaDetail(response.payload));
		}
	};

export const createDiplomaApi = createAsyncThunk(
	"Medical/createDiplomaApi",
	async (
		body: {
			diplomaType: DiplomaForm["diplomaType"];
			diplomaName: DiplomaForm["diplomaName"];
			isActive: DiplomaForm["isActive"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.CREATE_DIPLOMA}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateDiplomaApi = createAsyncThunk(
	"Medical/updateDiplomaApi",
	async (
		body: {
			body: {
				diplomaName: DiplomaForm["diplomaName"];
				isActive: DiplomaForm["isActive"];
			};
			uuid: DiplomaForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.UPDATE_DIPLOMA}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateDiploma =
	(diplomaDetail: DiplomaForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateDiplomaApi({
				uuid: diplomaDetail.uuid,
				body: {
					diplomaName: diplomaDetail.diplomaName,
					isActive: diplomaDetail.isActive,
				},
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.PATCH_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.DIPLOMA.link);
		}
	};

export const addDiploma =
	(diplomaDetail: DiplomaForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			createDiplomaApi({
				diplomaType: diplomaDetail.diplomaType,
				diplomaName: diplomaDetail.diplomaName,
				isActive: diplomaDetail.isActive,
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.DIPLOMA.link);
		}
	};
