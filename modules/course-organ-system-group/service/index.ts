import _ from "lodash";
import { setIsLoading } from "@/components/Loading/redux";
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
import { setIsOpenDialog } from "@/redux/slices/dialog";

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
	(form: CourseOrganSystemGroupForm) => async (dispatch: AppDispatch) => {
		const data = await dispatch(addCourseOrganSystemGroupAPI(form));
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
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
			if (_.get(response.payload, "error.message") === "Rejected") {
				return;
			}
			dispatch(setCourseOrganSystemGroupForm(response.payload));
		}
	};

export const updateCourseOrganSystemGroup =
	(clinicDetail: CourseOrganSystemGroupForm) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateCourseOrganSystemGroupApi({
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
