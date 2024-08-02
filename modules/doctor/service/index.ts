import { setIsLoading } from "@/components/Loading/redux";
import API_PATH from "@/constants/api";
import { AppDispatch } from "@/redux/config/configStore";
import { handleEmptyStringToNull } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IsActive } from "@/constants/constants";
import {
	modelPaginationOptions,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { setDoctorGrid, setTotalData } from "../redux";
import { DoctorList } from "../redux/master/model";

export interface DoctorPagination {
	doctorTypeLike: string | null;
	doctorCodeLike: string | null;
	firstnameLike: string | null;
	lastnameLike: string | null;
	pagination: PaginationOptions;
	isActive: IsActive | undefined;
}

export const doctorPagination: DoctorPagination = {
	pagination: modelPaginationOptions,
	doctorTypeLike: "",
	doctorCodeLike: "",
	isActive: undefined,
	firstnameLike: "",
	lastnameLike: "",
};

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

export const initDoctorGrid =
	(params: DoctorPagination = doctorPagination) =>
	async (dispatch: AppDispatch) => {
		const newParams = {
			...params,
			doctorTypeLike: handleEmptyStringToNull(params.doctorTypeLike),
			doctorCodeLike: handleEmptyStringToNull(params.doctorCodeLike),
			firstnameLike: handleEmptyStringToNull(params.firstnameLike),
			lastnameLike: handleEmptyStringToNull(params.lastnameLike),
		};
		dispatch(setIsLoading(true));
		const data = await dispatch(getDoctorList(newParams));
		dispatch(setIsLoading(false));
		const grid = data.payload.content.map((data: DoctorList, index: number) => {
			return {
				id: index,
				doctorType: data.doctorType,
				doctorCode: data.doctorCode,
				uuid: data.uuid,
				isActive: data.isActive,
				firstname: data.firstname,
				lastname: data.lastname,
				doctorFullName: `${data.firstname} ${data.lastname}`,
			};
		});
		const totalData = data.payload.totalElements;
		dispatch(setTotalData(totalData));
		dispatch(setDoctorGrid(grid));
	};
