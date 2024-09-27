import { AppDispatch } from "@/redux/config/configStore";
import { setIsLoading } from "@/redux/slices/container";
import {
	getDoctorCompareHistoryFilter,
	getDoctorCompareHistoryList,
} from "./api";
import _ from "lodash";
import { setDoctorCompareList, setDoctorFilterList } from "../../../redux";
import {
	compareParams,
	FilterList,
} from "@/modules/doctor/redux/history/model";

export const initDoctorCompareHistory =
	(params: compareParams) => async (dispatch: AppDispatch) => {
		// if (_.isEmpty(params.edit1) || _.isEmpty(params.edit2)) return;
		dispatch(setIsLoading(true));
		const data = await dispatch(getDoctorCompareHistoryList(params));
		dispatch(setIsLoading(false));
		if (!_.isEmpty(data.payload)) {
			dispatch(setDoctorCompareList(data.payload));
		}
	};

export const handleFilterCompare =
	(doctorCode: string) => async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));
		const data = await dispatch(getDoctorCompareHistoryFilter(doctorCode));
		dispatch(setIsLoading(false));
		if (!_.isEmpty(data.payload)) {
			dispatch(setDoctorFilterList(data.payload));
		}
	};

export const getDropdownOptions = (list: FilterList[]) => {
	return list.map((e) => ({
		label: e.label,
		value: e.editTimes,
	}));
};

export const getFilterUpdatedByEditTimes = (
	editTimes: string | number | null,
	filterList: FilterList[]
) => {
	return filterList.find((e) => e.editTimes === editTimes)?.updatedBy || "";
};

export const getFilterUpdatedDateEditTimes = (
	editTimes: string | number | null,
	filterList: FilterList[]
) => {
	return filterList.find((e) => e.editTimes === editTimes)?.updatedDate || "";
};
