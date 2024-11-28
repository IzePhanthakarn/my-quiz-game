import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addHospitalAnnouncedPriceFileCategoryDetailAPI,
	getHospitalAnnouncedPriceFileCategoryDetailDetail,
	getHospitalAnnouncedPriceFileCategoryDetailList,
	updateHospitalAnnouncedPriceFileCategoryDetailApi,
} from "./api";

import {
	HospitalAnnouncedPriceFileCategoryDetail,
	HospitalAnnouncedPriceFileCategoryDetailForm,
	GetHospitalAnnouncedPriceFileCategoryDetailList,
} from "@/modules/hospital/announced-price-file-category-detail/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import BaseToastNotification from "wcf-component-lib/src/components/BaseToastNotification";
import {
	setHospitalAnnouncedPriceFileCategoryDetailForm,
	setHospitalAnnouncedPriceFileCategoryDetailGrid,
} from "../../redux";

export const fetchCourseList =
	(course: HospitalAnnouncedPriceFileCategoryDetail) =>
	async (dispatch: AppDispatch) => {
		const body: GetHospitalAnnouncedPriceFileCategoryDetailList = {
			pagination: { ...course.grid.page },
			...course.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(
			getHospitalAnnouncedPriceFileCategoryDetailList(body)
		);
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setHospitalAnnouncedPriceFileCategoryDetailGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addHospitalAnnouncedPriceFileCategoryDetail =
	(
		form: HospitalAnnouncedPriceFileCategoryDetailForm,
		router: AppRouterInstance
	) =>
	async (dispatch: AppDispatch) => {
		console.log("🚀 ~ form:", form);

		const data = await dispatch(
			addHospitalAnnouncedPriceFileCategoryDetailAPI(form)
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.HOSPITAL.hospitalAnnouncedPriceFileCategoryDetail.list);
		}
	};

export const initGetHospitalAnnouncedPriceFileCategoryDetailDetail =
	(params: HospitalAnnouncedPriceFileCategoryDetailFormPageProps) =>
	async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(
				getHospitalAnnouncedPriceFileCategoryDetailDetail(`${uuid}`)
			);
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(
				setHospitalAnnouncedPriceFileCategoryDetailForm(response.payload)
			);
		}
	};

export const updateHospitalAnnouncedPriceFileCategoryDetail =
	(
		form: HospitalAnnouncedPriceFileCategoryDetailForm,
		router: AppRouterInstance
	) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalAnnouncedPriceFileCategoryDetailApi({
				uuid: form.uuid,
				body: form,
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.PATCH_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.HOSPITAL.hospitalAnnouncedPriceFileCategoryDetail.list);
		}
	};
