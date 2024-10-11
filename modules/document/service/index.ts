import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addDocumentAPI,
	getDocumentDetail,
	getDocumentList,
	updateDocumentApi,
} from "./api";
import { setDocumentForm, setDocumentGrid } from "@/modules/document/redux";
import {
	Document,
	DocumentForm,
	GetDocumentList,
} from "@/modules/document/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import { LINKS } from "@/constants/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { BaseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";

export const fetchDocumentList =
	(course: Document) => async (dispatch: AppDispatch) => {
		// const clonedFilter = _.cloneDeep(course.filter);
		// console.log("🚀 ~ clonedFilter", clonedFilter);
		// for (const key in clonedFilter) {
		// 	const value = _.get(clonedFilter, key);
		// 	// console.log("🚀 ~ value", value);
		// 	if (_.isString(value) && _.isEmpty(value)) {
		// 	}
		// }

		const body: GetDocumentList = {
			pagination: { ...course.grid.page },
			...course.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getDocumentList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setDocumentGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addDocument =
	(form: DocumentForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(addDocumentAPI(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.DOCUMENT.link);
		}
	};

export const initGetDocumentDetail =
	(params: DocumentFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getDocumentDetail(`${uuid}`));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(setDocumentForm(response.payload));
		}
	};

export const updateDocument =
	(document: DocumentForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateDocumentApi({
				uuid: document.uuid,
				body: document,
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
			router.push(LINKS.DOCUMENT.link);
		}
	};
