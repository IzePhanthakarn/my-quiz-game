import _ from "lodash";
import { AppDispatch } from "@/redux/config/configStore";
import { RequestForm, RequestFormDetail } from "../redux/model";
import {
	createRequestForm,
	getRequestFormByUuid,
	getRequestFormList,
	updateRequestForm,
} from "./api";
import { setRequestFormDetail, setRequestFormGrid } from "../redux";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import BaseToastNotification from "wcf-component-lib/src/components/BaseToastNotification";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import { setIsLoading } from "@/redux/slices/container";

export const handleOnGetRequestFormList =
	(requestForm: RequestForm) => async (dispatch: AppDispatch) => {
		const body = {
			...requestForm.filter,
			pagination: requestForm.grid.page,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getRequestFormList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setRequestFormGrid({
				data: result.payload.content,
				page: {
					...requestForm.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const handleOnGetRequestFormDetail =
	(uuid: string) => async (dispatch: AppDispatch) => {
		const response = await dispatch(getRequestFormByUuid(uuid));
		if (_.get(response, "error.message") === "Rejected") return;
		dispatch(setRequestFormDetail({ ...response.payload }));
	};

export const handleOnCreateRequestForm =
	(requestFormDetail: RequestFormDetail, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(createRequestForm(requestFormDetail));
		if (_.get(data, "error.message") === "Rejected") return;
		BaseToastNotification({
			message: BaseToastNotificationMessage.INSERT_SUCCESS,
			description: "Description",
		});
		router.push(LINKS.REQUEST_FORM.link);
	};

export const handleOnUpdateRequestForm =
	(requestFormDetail: RequestFormDetail, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const body = {
			uuid: requestFormDetail.uuid,
			body: requestFormDetail,
		};
		const data = await dispatch(updateRequestForm(body));
		if (_.get(data, "error.message") === "Rejected") return;
		BaseToastNotification({
			message: BaseToastNotificationMessage.PATCH_SUCCESS,
			description: "Description",
		});
		router.push(LINKS.COURSE_CERTIFICATE.link);
	};

export const handleOnSubmitRequestForm =
	(
		uuid: boolean,
		requestFormDetail: RequestFormDetail,
		router: AppRouterInstance
	) =>
	(dispatch: AppDispatch) => {
		if (uuid) dispatch(handleOnUpdateRequestForm(requestFormDetail, router));
		else dispatch(handleOnCreateRequestForm(requestFormDetail, router));
	};
