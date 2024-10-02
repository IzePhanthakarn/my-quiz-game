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
import { Option } from "wcf-component-lib/src/components/BaseDropDown/model";

export const initDoctorCompareHistory =
	(params: compareParams) => async (dispatch: AppDispatch) => {
		// if (_.isEmpty(params.olderVersion) || _.isEmpty(params.newerVersion)) return;
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

export const getDropdownOptions = (params: {
	list: FilterList[];
	olderVersion?: number;
	newerVersion?: number;
}) => {
	const { list, olderVersion, newerVersion } = params;
	if (!_.isNil(olderVersion)) {
		return list
			.filter((e) => e.editTimes > olderVersion)
			.map(
				(e) =>
					({
						label: e.label,
						value: e.editTimes, // Ensure value is number or string as per Option
					} as Option)
			);
	}
	if (!_.isNil(newerVersion)) {
		return list
			.filter((e) => e.editTimes < newerVersion)
			.map(
				(e) =>
					({
						label: e.label,
						value: e.editTimes, // Ensure value is number or string as per Option
					} as Option)
			);
	}
};

export const getFilterUpdatedByEditTimes = (
	editTimes: number | null,
	filterList: FilterList[]
) => {
	return filterList.find((e) => e.editTimes === editTimes)?.updatedBy || "";
};

export const getFilterUpdatedDateEditTimes = (
	editTimes: number | null,
	filterList: FilterList[]
) => {
	return filterList.find((e) => e.editTimes === editTimes)?.updatedDate || "";
};
