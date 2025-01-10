import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addHospitalAnnouncedPriceDetailMasterAPI,
	downloadAnnouncedPriceFileTemplateApi,
	getHospitalAnnouncedPriceDetailMasterDetail,
	getHospitalAnnouncedPriceDetailMasterList,
	updateHospitalAnnouncedPriceDetailMasterApi,
} from "./api";

import {
	HospitalAnnouncedPriceDetailMaster,
	HospitalAnnouncedPriceDetailMasterForm,
	GetHospitalAnnouncedPriceDetailMasterList,
} from "@/modules/hospital/announced-price-detail-master/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import BaseToastNotification from "wcf-component-lib/src/components/BaseToastNotification";
import {
	setHospitalAnnouncedPriceDetailMasterForm,
	setHospitalAnnouncedPriceDetailMasterGrid,
} from "../../redux";
import { handleDownloadFile } from "../../../../utils";

export const fetchCourseList =
	(course: HospitalAnnouncedPriceDetailMaster) =>
	async (dispatch: AppDispatch) => {
		const body: GetHospitalAnnouncedPriceDetailMasterList = {
			pagination: { ...course.grid.page },
			...course.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(
			getHospitalAnnouncedPriceDetailMasterList(body)
		);
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setHospitalAnnouncedPriceDetailMasterGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addHospitalAnnouncedPriceDetailMaster =
	(form: HospitalAnnouncedPriceDetailMasterForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		console.log("🚀 ~ form:", form);

		const data = await dispatch(addHospitalAnnouncedPriceDetailMasterAPI(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.HOSPITAL.hospitalAnnouncedPriceDetailMaster.list);
		}
	};

export const initGetHospitalAnnouncedPriceDetailMasterDetail =
	(params: HospitalAnnouncedPriceDetailMasterFormPageProps) =>
	async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(
				getHospitalAnnouncedPriceDetailMasterDetail(`${uuid}`)
			);
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(
				setHospitalAnnouncedPriceDetailMasterForm({
					...response.payload,
					hospitalAnnouncedPriceDetailCategoryMasterUuid:
						response.payload.hospitalAnnouncedPriceDetailCategoryMaster.uuid,
				})
			);
		}
	};

export const updateHospitalAnnouncedPriceDetailMaster =
	(form: HospitalAnnouncedPriceDetailMasterForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalAnnouncedPriceDetailMasterApi({
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
			router.push(LINKS.HOSPITAL.hospitalAnnouncedPriceDetailMaster.list);
		}
	};

export const handleDownloadTemplate = () => async (dispatch: AppDispatch) => {
	const response = await dispatch(
		downloadAnnouncedPriceFileTemplateApi()
	).unwrap();
	if (_.get(response, "error.message") === "Rejected") return;

	handleDownloadFile(response, "template.xlsx");
};
