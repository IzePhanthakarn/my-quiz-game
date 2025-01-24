import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import { mapIdByIndex, handleEmptyStringToNull } from "@/utils";
import { ADDRESS, IsActive } from "wcf-component-lib/src/constants/constants";
import {
	modelPaginationOptions,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import {
	setDoctorFilter,
	setDoctorForm,
	setDoctorGrid,
	setPageNumber,
	setPagination,
	setTotalData,
} from "../redux";
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
import BaseToastNotification from "wcf-component-lib/src/components/BaseToastNotification";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { CourseCategory } from "@/components/MedDropDown/service/model";
import {
	findNameDisplay,
	handleSession,
} from "@/components/MedDropDown/service";
import { DoctorHospital } from "wcf-component-lib/src/components/BaseDropDown/model";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { DoctorFilter } from "../redux/filter/model";

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
		const doctorData = data.doctorData;

		const result = {
			doctorData: doctorData,
			doctorBank: mapIdByIndex(data.doctorBank),
			doctorDetail: mapIdByIndex(data.doctorDetail),
			doctorHospital: mapIdByIndex(data.doctorHospital),
			doctorTraining: mapIdByIndex(data.training),
			doctorPostal: mapIdByIndex(data.doctorPostal),
			editTimes: data.editTimes,
		};

		const courseCategory = data.doctorData.courseCategory;
		dispatch(
			setDoctorForm({
				...result,
				doctorData: { ...doctorData, isELearning: courseCategory === "E" },
			})
		);
	};

// List
export const initDoctorGrid =
	(filter: DoctorFilter, pagination: PaginationOptions) =>
	async (dispatch: AppDispatch) => {
		dispatch(setPagination(pagination));

		const newFilter = {
			doctorTypeLike: handleEmptyStringToNull(filter.doctorTypeLike),
			doctorCodeLike: handleEmptyStringToNull(filter.doctorCodeLike),
			firstnameLike: handleEmptyStringToNull(filter.firstnameLike),
			lastnameLike: handleEmptyStringToNull(filter.lastnameLike),
			diplomaTypeLike: handleEmptyStringToNull(filter.diplomaTypeLike),
			hospitalNameLike: handleEmptyStringToNull(filter.hospitalNameLike),
			proviceHospitalLike: handleEmptyStringToNull(filter.proviceHospitalLike),
			professionalCodeLike: handleEmptyStringToNull(
				filter.professionalCodeLike
			),
			isActive: filter.isActive,
		};

		const newParams = { ...newFilter, pagination };

		dispatch(setIsLoading(true));
		dispatch(handleSession(SESSION_NAME.TITLE));
		const data = await dispatch(getDoctorList(newParams));
		if (_.isNil(data.payload.content)) return;
		const grid = data.payload.content.map((data: DoctorList, index: number) => {
			return {
				id: index,
				professionalCode: data.professionalCode,
				doctorCode: data.doctorCode,
				uuid: data.uuid,
				title: data.title,
				eDiploma: data.eDiploma,
				eHospital: data.eHospital,
				eTitle: data.eTitle,
				firstname: data.firstname,
				lastname: data.lastname,
				doctorFullName: `${findNameDisplay(SESSION_NAME.TITLE, data.title)}${
					data.firstname
				} ${data.lastname}`,
				diplomaTypeList: data.diplomaTypeList,
				provinceCodeList: data.provinceCodeList,
				hospitalNameList: data.hospitalNameList,
			};
		});
		const totalData = data.payload.totalElements;

		dispatch(setTotalData(totalData));
		dispatch(setDoctorGrid(grid));

		dispatch(setIsLoading(false));
	};

const handleCourseCategory = (courseCategory: string | null) => {
	const courseCategorySession = JSON.parse(
		sessionStorage.getItem(SESSION_NAME.COURSE_CATEGORY) ?? "[]"
	);
	return courseCategorySession.find(
		(e: CourseCategory) => e.courseCategory === courseCategory
	);
};

export const handleDoctorFormSubmit =
	(doctorForm: DoctorForm, uuid: string, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsOpenBaseConfirmDialog(false));
		const categoryData = handleCourseCategory(
			doctorForm.doctorData.courseCategory
		);
		const newDoctorData = {
			...doctorForm.doctorData,
			courseCategoryId: categoryData.courseCategoryId,
			categoryDescription: categoryData.categoryDescription,
		};
		const newDoctorForm = {
			...doctorForm,
			doctorData: { ...newDoctorData },
		};

		let result;
		dispatch(setIsLoading(true));
		if (!_.isEmpty(uuid)) {
			result = await dispatch(
				updateDoctorForm({ params: newDoctorForm, uuid })
			);
		} else {
			result = await dispatch(createDoctorForm(newDoctorForm));
		}
		dispatch(setIsLoading(false));
		let message = "";
		let description = "";
		if (_.get(result, "error.message") === "Rejected") {
			if (!_.isEmpty(uuid)) message = BaseToastNotificationMessage.PATCH_ERROR;
			else message = BaseToastNotificationMessage.INSERT_ERROR;
			BaseToastNotification({
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
			BaseToastNotification({
				message: message,
				description: description,
			});
		}
	};

export const findE_HospitalProvince = (eHospital: string) => {
	const hospital = JSON.parse(
		sessionStorage.getItem(SESSION_NAME.HOSPITAL) ?? "[]"
	);
	const provinceCode = hospital.find(
		(e: DoctorHospital) => e.hospitalName === eHospital
	)?.provinceCode;
	if (!_.isEmpty(provinceCode)) {
		return findLabelAddress(provinceCode, ADDRESS.PROVINCE);
	}
	return "อื่นๆ";
};
