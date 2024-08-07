import _ from "lodash";
import { setIsLoading } from "@/components/Loading/redux";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addLtPropertiesAPI,
	getLtPropertiesDetail,
	getLtPropertiesList,
	updateLtPropertiesApi,
} from "./api";
import {
	setLtPropertiesForm,
	setLtPropertiesGrid,
} from "@/modules/lt-properties/redux";
import {
	LtProperties,
	LtPropertiesForm,
	GetLtPropertiesList,
} from "@/modules/lt-properties/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import { baseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";

export const fetchLtPropertiesList =
	(course: LtProperties) => async (dispatch: AppDispatch) => {
		const body: GetLtPropertiesList = {
			pagination: { ...course.grid.page },
			...course.filter,
			// amount: _.isEmpty(course.filter.amount) ? null : course.filter.amount,
			// fareAmount: _.isEmpty(course.filter.fareAmount)
			// 	? null
			// 	: course.filter.fareAmount,
			// amountLimit: _.isEmpty(course.filter.amountLimit)
			// 	? null
			// 	: course.filter.amountLimit,
			descriptionLike: _.isEmpty(course.filter.descriptionLike)
				? null
				: course.filter.descriptionLike,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getLtPropertiesList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setLtPropertiesGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addLtProperties =
	(form: LtPropertiesForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(addLtPropertiesAPI(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.LT_PROPERTIES.link);
		}
	};

export const initGetLtPropertiesDetail =
	(params: LtPropertiesFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getLtPropertiesDetail(`${uuid}`));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(setLtPropertiesForm(response.payload));
		}
	};

export const updateLtProperties =
	(form: LtPropertiesForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateLtPropertiesApi({
				uuid: form.uuid,
				body: form,
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.PATCH_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.LT_PROPERTIES.link);
		}
	};
