import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import { handleEmptyStringToNull } from "@/utils";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	modelPaginationOptions,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { setDoctorForm, setDoctorGrid, setTotalData } from "../redux";
import { DoctorList } from "../redux/master/model";
import { getDoctorForm, getDoctorList } from "./api";
import _ from "lodash";

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

// Form
export const initGetDoctorForm =
	(uuid: string) => async (dispatch: AppDispatch) => {
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getDoctorForm(uuid));
			dispatch(setDoctorForm(response.payload));
		}
	};

// List
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
