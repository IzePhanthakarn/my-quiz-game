import { AppDispatch } from "@/redux/config/configStore";
import { setIsLoading } from "@/redux/slices/container";
import {
	getDoctorCompareAllHistoryList,
	getDoctorCompareHistoryFilter,
	getDoctorCompareHistoryList,
} from "./api";
import _ from "lodash";
import {
	setCompareAllParams,
	setDoctorCompareList,
	setDoctorFilterList,
} from "../../../redux";
import {
	CompareAllList,
	CompareList,
	CompareParams,
	FilterList,
} from "@/modules/doctor/redux/history/model";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";
import { findNameDisplay } from "@/components/MedDropDown/service";
import { SESSION_NAME } from "@/components/MedDropDown/model";

export const initDoctorCompareHistory =
	(params: CompareParams) => async (dispatch: AppDispatch) => {
		// if (_.isEmpty(params.olderVersion) || _.isEmpty(params.newerVersion)) return;
		dispatch(setIsLoading(true));
		const data = await dispatch(getDoctorCompareHistoryList(params));
		dispatch(setIsLoading(false));
		const compareData = data.payload;
		const addressList = [
			{ index: 3, type: ADDRESS.PROVINCE },
			{ index: 4, type: ADDRESS.AMPHUR },
			{ index: 5, type: ADDRESS.TAMBOL },
		];
		const checkAddress = [3, 4, 5];

		if (!_.isEmpty(compareData)) {
			compareData.doctor.map((e: CompareList, index: number) => {
				if (index === 3) {
					e.olderValue = findNameDisplay(SESSION_NAME.TITLE, e.olderValue);
					e.newerValue = findNameDisplay(SESSION_NAME.TITLE, e.newerValue);
				} else if (index === 6) {
					e.olderValue = findNameDisplay(
						SESSION_NAME.DOCTOR_TYPE,
						e.olderValue
					);
					e.newerValue = findNameDisplay(
						SESSION_NAME.DOCTOR_TYPE,
						e.newerValue
					);
				}
				return { ...e };
			});
			compareData.doctorAddress.map((e: CompareList, index: number) => {
				if (checkAddress.includes(index)) {
					const address = addressList.find((items) => items.index === index);
					if (address) {
						e.olderValue = findLabelAddress(e.olderValue, address.type);
						e.newerValue = findLabelAddress(e.newerValue, address.type);
					}
				}
				return { ...e };
			});
		}
		dispatch(setDoctorCompareList(compareData));
	};

export const handleFilterCompare =
	(doctorId: number) => async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));
		const data = await dispatch(getDoctorCompareHistoryFilter(doctorId));
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
			.filter((e) => +e.editTimes > olderVersion)
			.map((e) => ({
				label: e.label,
				value: e.editTimes,
			}));
	}
	if (!_.isNil(newerVersion)) {
		return list
			.filter((e) => +e.editTimes < newerVersion)
			.map((e) => ({
				label: e.label,
				value: e.editTimes,
			}));
	}
};

export const getFilterUpdatedByEditTimes = (
	editTimes: number | null,
	filterList: FilterList[]
) => {
	return filterList.find((e) => +e.editTimes === editTimes)?.updatedBy || "";
};

export const getFilterUpdatedDateEditTimes = (
	editTimes: number | null,
	filterList: FilterList[]
) => {
	return filterList.find((e) => +e.editTimes === editTimes)?.updatedDate || "";
};

export const initDoctorCompareAllHistory =
	(doctorId: number) => async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));
		const data = await dispatch(getDoctorCompareAllHistoryList(doctorId));
		dispatch(setIsLoading(false));
		const compareData = data.payload;
		const addressList = [
			{ field: "province", type: ADDRESS.PROVINCE },
			{ field: "amphur", type: ADDRESS.AMPHUR },
			{ field: "tambol", type: ADDRESS.TAMBOL },
		];
		const checkAddress = ["province", "amphur", "tambol"];
		if (!_.isEmpty(compareData)) {
			compareData.map((e: CompareAllList) => {
				if (e.field === "title") {
					e.olderValue = findNameDisplay(SESSION_NAME.TITLE, e.olderValue);
					e.newerValue = findNameDisplay(SESSION_NAME.TITLE, e.newerValue);
				} else if (e.field === "doctorType") {
					e.olderValue = findNameDisplay(
						SESSION_NAME.DOCTOR_TYPE,
						e.olderValue
					);
					e.newerValue = findNameDisplay(
						SESSION_NAME.DOCTOR_TYPE,
						e.newerValue
					);
				} else if (checkAddress.includes(e.field)) {
					const address = addressList.find((items) => items.field === e.field);
					if (address) {
						e.olderValue = findLabelAddress(e.olderValue, address.type);
						e.newerValue = findLabelAddress(e.newerValue, address.type);
					}
				}
				return { ...e };
			});
		}
		dispatch(setCompareAllParams(compareData));
	};
