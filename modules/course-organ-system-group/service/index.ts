import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addCourseOrganSystemGroupAPI,
	getCourseOrganSystemGroupDetail,
	getCourseOrganSystemGroupList,
	updateCourseOrganSystemGroupApi,
} from "./api";
import {
	setCourseOrganSystemGroupForm,
	setCourseOrganSystemGroupGrid,
} from "@/modules/course-organ-system-group/redux";
import {
	CourseOrganSystemGroup,
	CourseOrganSystemGroupForm,
	GetCourseOrganSystemGroupList,
} from "@/modules/course-organ-system-group/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import BaseToastNotification from "wcf-component-lib/src/components/BaseToastNotification";

export const fetchCourseList =
	(course: CourseOrganSystemGroup) => async (dispatch: AppDispatch) => {
		const body: GetCourseOrganSystemGroupList = {
			pagination: { ...course.grid.page },
			...course.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getCourseOrganSystemGroupList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setCourseOrganSystemGroupGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addCourseOrganSystemGroup =
	(form: CourseOrganSystemGroupForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(addCourseOrganSystemGroupAPI(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.COURSE_ORGAN_SYSTEM_GROUP.link);
		}
	};

export const initGetCourseOrganSystemGroupDetail =
	(params: CourseOrganSystemGroupFormPageProps) =>
	async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(
				getCourseOrganSystemGroupDetail(`${uuid}`)
			);
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(setCourseOrganSystemGroupForm(response.payload));
		}
	};

export const updateCourseOrganSystemGroup =
	(form: CourseOrganSystemGroupForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateCourseOrganSystemGroupApi({
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
			router.push(LINKS.COURSE_ORGAN_SYSTEM_GROUP.link);
		}
	};
