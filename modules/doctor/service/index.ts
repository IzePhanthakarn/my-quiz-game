import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import { mapIdByIndex, handleEmptyStringToNull } from "@/utils";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	modelPaginationOptions,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { setDoctorForm, setDoctorGrid, setTotalData } from "../redux";
import { DoctorList } from "../redux/master/model";
import {
	createDoctorForm,
	getDoctorForm,
	getDoctorList,
	updateDoctorForm,
} from "./api";
import _ from "lodash";
import { DoctorForm } from "../redux/form/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import { baseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface DoctorPagination {
	doctorTypeLike: string | null;
	doctorCodeLike: string | null;
	firstnameLike: string | null;
	lastnameLike: string | null;
	diplomaTypeLike: string | null;
	hospitalNameLike: string | null;
	proviceHospitalLike: string | null;
	professionalCodeLike: string | null;
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
	diplomaTypeLike: "",
	hospitalNameLike: "",
	proviceHospitalLike: "",
	professionalCodeLike: "",
};

// Form
export const initGetDoctorForm =
	(uuid: string) => async (dispatch: AppDispatch) => {
		if (!uuid) return;

		const response = await dispatch(getDoctorForm(uuid));
		const data = response.payload;
		const result = {
			doctorData: data.doctorData,
			doctorBank: mapIdByIndex(data.doctorBank),
			doctorDetail: mapIdByIndex(data.doctorDetail),
			doctorHospital: mapIdByIndex(data.doctorHospital),
			doctorTraining: mapIdByIndex(data.training),
			doctorPostal: mapIdByIndex(data.doctorPostal),
			editTimes: data.editTimes,
		};
		dispatch(setDoctorForm(result));
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
			diplomaTypeLike: handleEmptyStringToNull(params.diplomaTypeLike),
			hospitalNameLike: handleEmptyStringToNull(params.hospitalNameLike),
			proviceHospitalLike: handleEmptyStringToNull(params.proviceHospitalLike),
			professionalCodeLike: handleEmptyStringToNull(
				params.professionalCodeLike
			),
		};
		dispatch(setIsLoading(true));
		const data = await dispatch(getDoctorList(newParams));
		dispatch(setIsLoading(false));
		if (_.isNil(data.payload.content)) return;
		const grid = data.payload.content.map((data: DoctorList, index: number) => {
			return {
				id: index,
				professionalCode: data.professionalCode,
				doctorCode: data.doctorCode,
				uuid: data.uuid,
				firstname: data.firstname,
				lastname: data.lastname,
				doctorFullName: `${data.firstname} ${data.lastname}`,
				diplomaTypeList: data.diplomaTypeList,
				provinceCodeList: data.provinceCodeList,
				hospitalNameList: data.hospitalNameList,
			};
		});
		const totalData = data.payload.totalElements;
		dispatch(setTotalData(totalData));
		dispatch(setDoctorGrid(grid));
	};

export const handleDoctorFormSubmit =
	(doctorForm: DoctorForm, uuid: string, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsOpenBaseConfirmDialog(false));
		let result;
		dispatch(setIsLoading(true));
		if (!_.isEmpty(uuid)) {
			result = await dispatch(updateDoctorForm({ params: doctorForm, uuid }));
		} else {
			result = await dispatch(createDoctorForm(doctorForm));
		}
		dispatch(setIsLoading(false));
		let message = "";
		let description = "";
		if (_.get(result, "error.message") === "Rejected") {
			if (!_.isEmpty(uuid)) message = BaseToastNotificationMessage.PATCH_ERROR;
			else message = BaseToastNotificationMessage.INSERT_ERROR;
			baseToastNotification({
				message: message,
				description: `${_.get(result, "error.message")}`,
			});
		} else {
			if (!_.isEmpty(uuid)) {
				description = "แก้ไขสำเร็จ";
				message = BaseToastNotificationMessage.PATCH_SUCCESS;
			} else {
				description = "เพิ่มสำเร็จ";
				message = BaseToastNotificationMessage.INSERT_SUCCESS;
			}
			router.push(LINKS.DOCTOR.link);
			baseToastNotification({
				message: message,
				description: description,
			});
		}
	};
