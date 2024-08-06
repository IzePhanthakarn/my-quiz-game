import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { DiplomaDetail } from "../redux/form/model";
import { setIsOpenDialog } from "@/redux/slices/dialog";
import { setDiplomaDetail } from "../redux";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { setToast } from "@/redux/slices/toast";
import {
	BaseToastNotificationMessage,
	BaseToastNotificationType,
} from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import { setIsLoading } from "@/components/Loading/redux";

export const getDiplomaDetail = createAsyncThunk(
	"Medical/getDiplomaDetail",
	async (id: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_DIPLOMA_DETAIL}/${id}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
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
			diplomaType: DiplomaDetail["diplomaType"];
			diplomaName: DiplomaDetail["diplomaName"];
			isActive: DiplomaDetail["isActive"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.CREATE_DIPLOMA}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const updateDiplomaApi = createAsyncThunk(
	"Medical/updateDiplomaApi",
	async (
		body: {
			body: {
				diplomaName: DiplomaDetail["diplomaName"];
				isActive: DiplomaDetail["isActive"];
			};
			uuid: DiplomaDetail["uuid"];
		},
		thunkAPi
	) => {
		try {
			const apiPath = `${API_PATH.UPDATE_DIPLOMA}/${body.uuid}`;
			const response = await axios.patch(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const updateDiploma =
	(diplomaDetail: DiplomaDetail, router: AppRouterInstance) =>
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
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(
				setToast({
					isOpen: true,
					message: BaseToastNotificationMessage.PATCH_SUCCESS,
					type: BaseToastNotificationType.SUCCESS,
					description: "Search Description",
				})
			);
			dispatch(setIsLoading(true));
			router.push(LINKS.DIPLOMA.link);
		}
	};

export const addDiploma =
	(diplomaDetail: DiplomaDetail, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			createDiplomaApi({
				diplomaType: diplomaDetail.diplomaType,
				diplomaName: diplomaDetail.diplomaName,
				isActive: diplomaDetail.isActive,
			})
		);
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(
				setToast({
					isOpen: true,
					message: BaseToastNotificationMessage.INSERT_SUCCESS,
					type: BaseToastNotificationType.SUCCESS,
					description: "Search Description",
				})
			);
			dispatch(setIsLoading(true));
			router.push(LINKS.DIPLOMA.link);
		}
	};
