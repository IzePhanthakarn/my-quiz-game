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
import { DiplomaList } from "../redux/master/model";
import { setTotalData, setDiplomaGrid } from "../redux";

export interface DiplomaPagination {
	diplomaTypeLike: string | null;
	diplomaNameLike: string | null;
	pagination: PaginationOptions;
	isActive: IsActive | undefined;
}

export const diplomaPagination: DiplomaPagination = {
	pagination: modelPaginationOptions,
	diplomaTypeLike: "",
	diplomaNameLike: "",
	isActive: undefined,
};

export const getDiplomaList = createAsyncThunk(
	"Medical/getDiplomaDetail",
	async (params: DiplomaPagination, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_DIPLOMA_PAGE}`;
			const response = await axios.post(apiPath, params);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const initDiplomaGrid =
	(params: DiplomaPagination = diplomaPagination) =>
	async (dispatch: AppDispatch) => {
		const newParams = {
			...params,
			diplomaTypeLike: handleEmptyStringToNull(params.diplomaTypeLike),
			diplomaNameLike: handleEmptyStringToNull(params.diplomaNameLike),
		};
		dispatch(setIsLoading(true));
		const data = await dispatch(getDiplomaList(newParams));
		dispatch(setIsLoading(false));
		const grid = data.payload.content.map(
			(data: DiplomaList, index: number) => {
				return {
					id: index,
					diplomaType: data.diplomaType,
					diplomaName: data.diplomaName,
					uuid: data.uuid,
					isActive: data.isActive,
				};
			}
		);
		const totalData = data.payload.totalElements;
		dispatch(setTotalData(totalData));
		dispatch(setDiplomaGrid(grid));
	};
