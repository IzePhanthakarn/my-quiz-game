import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addMedicalAmountAPI,
	getMedicalAmountDetail,
	getMedicalAmountList,
	updateMedicalAmountApi,
} from "./api";
import {
	setMedicalAmountForm,
	setMedicalAmountGrid,
} from "@/modules/medical-amount/redux";
import {
	MedicalAmount,
	MedicalAmountForm,
	GetMedicalAmountList,
} from "@/modules/medical-amount/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import { LINKS } from "@/constants/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { BaseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";

export const fetchMedicalAmountList =
	(course: MedicalAmount) => async (dispatch: AppDispatch) => {
		const body: GetMedicalAmountList = {
			pagination: { ...course.grid.page },
			...course.filter,
			amount: _.isEmpty(course.filter.amount) ? null : course.filter.amount,
			fareAmount: _.isEmpty(course.filter.fareAmount)
				? null
				: course.filter.fareAmount,
			amountLimit: _.isEmpty(course.filter.amountLimit)
				? null
				: course.filter.amountLimit,
			noticeLike: _.isEmpty(course.filter.noticeLike)
				? null
				: course.filter.noticeLike,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getMedicalAmountList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setMedicalAmountGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addMedicalAmount =
	(form: MedicalAmountForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(addMedicalAmountAPI(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.MEDICAL_AMOUNT.link);
		}
	};

export const initGetMedicalAmountDetail =
	(params: MedicalAmountFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getMedicalAmountDetail(`${uuid}`));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(setMedicalAmountForm(response.payload));
		}
	};

export const updateMedicalAmount =
	(medicalAmount: MedicalAmountForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateMedicalAmountApi({
				uuid: medicalAmount.uuid,
				body: medicalAmount,
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
			router.push(LINKS.MEDICAL_AMOUNT.link);
		}
	};
