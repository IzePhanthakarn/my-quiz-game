import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { DoctorPagination } from ".";

export const getDoctorList = createAsyncThunk(
	"Medical/getDoctorDetail",
	async (params: DoctorPagination, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_DOCTOR_PAGE}`;
			const response = await axios.post(apiPath, params);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getDoctorForm = createAsyncThunk(
	"Medical/getDoctorForm",
	async (id: string, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_DOCTOR_FORM}/${id}`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

// export const createDiplomaApi = createAsyncThunk(
// 	"Medical/createDiplomaApi",
// 	async (
// 		body: {
// 			diplomaType: DiplomaForm["diplomaType"];
// 			diplomaName: DiplomaForm["diplomaName"];
// 			isActive: DiplomaForm["isActive"];
// 		},
// 		thunkAPi
// 	) => {
// 		try {
// 			const apiPath = `${API_PATH.CREATE_DIPLOMA}`;
// 			const response = await axios.post(apiPath, body);
// 			return response.data;
// 		} catch (err) {
// 			return thunkAPi.rejectWithValue("");
// 		}
// 	}
// );

// export const updateDiplomaApi = createAsyncThunk(
// 	"Medical/updateDiplomaApi",
// 	async (
// 		body: {
// 			body: {
// 				diplomaName: DiplomaForm["diplomaName"];
// 				isActive: DiplomaForm["isActive"];
// 			};
// 			uuid: DiplomaForm["uuid"];
// 		},
// 		thunkAPi
// 	) => {
// 		try {
// 			const apiPath = `${API_PATH.UPDATE_DIPLOMA}/${body.uuid}`;
// 			const response = await axios.patch(apiPath, body.body);
// 			return response.data;
// 		} catch (err) {
// 			return thunkAPi.rejectWithValue("");
// 		}
// 	}
// );

// export const updateDiploma =
// 	(diplomaDetail: DiplomaForm, router: AppRouterInstance) =>
// 	async (dispatch: AppDispatch) => {
// 		const data = await dispatch(
// 			updateDiplomaApi({
// 				uuid: diplomaDetail.uuid,
// 				body: {
// 					diplomaName: diplomaDetail.diplomaName,
// 					isActive: diplomaDetail.isActive,
// 				},
// 			})
// 		);
// 		dispatch(setIsOpenBaseConfirmDialog(false));
// 		if (_.get(data.payload, "error.message") === "Rejected") {
// 			return;
// 		} else {
// 			baseToastNotification({
// 				message: BaseToastNotificationMessage.PATCH_SUCCESS,
// 				description: "Description",
// 			});
// 			dispatch(setIsLoading(true));
// 			router.push(LINKS.DIPLOMA.link);
// 		}
// 	};

// export const addDiploma =
// 	(diplomaDetail: DiplomaForm, router: AppRouterInstance) =>
// 	async (dispatch: AppDispatch) => {
// 		const data = await dispatch(
// 			createDiplomaApi({
// 				diplomaType: diplomaDetail.diplomaType,
// 				diplomaName: diplomaDetail.diplomaName,
// 				isActive: diplomaDetail.isActive,
// 			})
// 		);
// 		dispatch(setIsOpenBaseConfirmDialog(false));
// 		if (_.get(data.payload, "error.message") === "Rejected") {
// 			return;
// 		} else {
// 			baseToastNotification({
// 				message: BaseToastNotificationMessage.INSERT_SUCCESS,
// 				description: "Description",
// 			});
// 			dispatch(setIsLoading(true));
// 			router.push(LINKS.DIPLOMA.link);
// 		}
// 	};
