import _ from "lodash";
import { setIsLoading } from "@/components/Loading/redux";
import { AppDispatch } from "@/redux/config/configStore";
import {
	GetCourseListBody,
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
} from "@/modules/course-category/redux/model";
import { setIsOpenDialog } from "@/redux/slices/dialog";

export const fetchCourseList =
	(course: CourseCategory) => async (dispatch: AppDispatch) => {
		const body: GetCourseListBody = {
			courseCategoryId: "",
			categoryDescription: "",
			pagination: course.grid.page,
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
	(form: CourseCategoryForm) => async (dispatch: AppDispatch) => {
		const data = await dispatch(addCourseCategoryList(form));
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
		}
	};

export const initGetCourseCategoryDetail =
	(params: CourseCategoryFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getCourseCategoryDetail(`${uuid}`));
			if (_.get(response.payload, "error.message") === "Rejected") {
				return;
			}
			await dispatch(setCourseCategoryForm(response.payload));
		}
	};

export const updateCourseCategory =
	(clinicDetail: CourseCategoryForm) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateCourseCategoryApi({
				uuid: clinicDetail.uuid,
				body: clinicDetail,
			})
		);
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
		}
	};
