import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addCourseCategoryList,
	getCourseCategoryDetail,
	getCourseList,
	updateCourseCategoryApi,
} from "./api";
import {
	setCourseCategoryForm,
	setCourseCategoryGrid,
} from "@/modules/course-category/redux";
import {
	CourseCategory,
	CourseCategoryForm,
	GetCourseCategoryList,
} from "@/modules/course-category/redux/model";
import {
	setIsOpenBaseConfirmDialog,
	setIsOpenDialog,
} from "@/redux/slices/dialog";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import { LINKS } from "@/constants/links";
import { BaseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";

export const fetchCourseList =
	(course: CourseCategory) => async (dispatch: AppDispatch) => {
		const body: GetCourseCategoryList = {
			pagination: { ...course.grid.page },
			...course.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getCourseList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setCourseCategoryGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addCourseCategory =
	(form: CourseCategoryForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(addCourseCategoryList(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			BaseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.COURSE_CATEGORY.link);
		}
	};

export const initGetCourseCategoryDetail =
	(params: CourseCategoryFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getCourseCategoryDetail(`${uuid}`));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(setCourseCategoryForm(response.payload));
		}
	};

export const updateCourseCategory =
	(courseCategory: CourseCategoryForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateCourseCategoryApi({
				uuid: courseCategory.uuid,
				body: courseCategory,
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
			router.push(LINKS.COURSE_CATEGORY.link);
		}
	};
