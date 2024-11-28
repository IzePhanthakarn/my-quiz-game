import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addHospitalAnnouncedPriceDetailCategoryMasterAPI,
	getHospitalAnnouncedPriceDetailCategoryMasterDetail,
	getHospitalAnnouncedPriceDetailCategoryMasterList,
	updateHospitalAnnouncedPriceDetailCategoryMasterApi,
} from "./api";

import {
	HospitalAnnouncedPriceDetailCategoryMaster,
	HospitalAnnouncedPriceDetailCategoryMasterForm,
	GetHospitalAnnouncedPriceDetailCategoryMasterList,
} from "@/modules/hospital/announced-price-detail-category-master/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import BaseToastNotification from "wcf-component-lib/src/components/BaseToastNotification";
import {
	setHospitalAnnouncedPriceDetailCategoryMasterForm,
	setHospitalAnnouncedPriceDetailCategoryMasterGrid,
} from "../../redux";

export const fetchCourseList =
	(course: HospitalAnnouncedPriceDetailCategoryMaster) =>
	async (dispatch: AppDispatch) => {
		const body: GetHospitalAnnouncedPriceDetailCategoryMasterList = {
			pagination: { ...course.grid.page },
			...course.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(
			getHospitalAnnouncedPriceDetailCategoryMasterList(body)
		);
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setHospitalAnnouncedPriceDetailCategoryMasterGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addHospitalAnnouncedPriceDetailCategoryMaster =
	(
		form: HospitalAnnouncedPriceDetailCategoryMasterForm,
		router: AppRouterInstance
	) =>
	async (dispatch: AppDispatch) => {
		console.log("🚀 ~ form:", form);

		const data = await dispatch(
			addHospitalAnnouncedPriceDetailCategoryMasterAPI(form)
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
			router.push(
				LINKS.HOSPITAL.hospitalAnnouncedPriceDetailCategoryMaster.list
			);
		}
	};

export const initGetHospitalAnnouncedPriceDetailCategoryMasterDetail =
	(params: HospitalAnnouncedPriceDetailCategoryMasterFormPageProps) =>
	async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(
				getHospitalAnnouncedPriceDetailCategoryMasterDetail(`${uuid}`)
			);
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(
				setHospitalAnnouncedPriceDetailCategoryMasterForm(response.payload)
			);
		}
	};

export const updateHospitalAnnouncedPriceDetailCategoryMaster =
	(
		form: HospitalAnnouncedPriceDetailCategoryMasterForm,
		router: AppRouterInstance
	) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalAnnouncedPriceDetailCategoryMasterApi({
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
			router.push(
				LINKS.HOSPITAL.hospitalAnnouncedPriceDetailCategoryMaster.list
			);
		}
	};
