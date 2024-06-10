import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setClinicDetail, setClinicGrid } from "../redux";
import { ClinicForm } from "../redux/master/model";
import { ClinicDetail } from "../redux/model";

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

export const getClinicList = createAsyncThunk(
	"Medical/getClinic",
	async (params: { id: string }, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_CLINIC}`;
			const response = await axios.get(apiPath, { params });
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const initClinicGrid =
	(id: string = "") =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(getClinicList({ id }));
		const grid = data.payload.map((data: ClinicForm, index: number) => {
			return {
				id: index,
				clinicCode: data.clinicCode,
				clinicName: data.clinicName,
			};
		});
		dispatch(setClinicGrid(grid));
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
