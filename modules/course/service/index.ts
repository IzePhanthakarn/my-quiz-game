import _ from "lodash";
import { setIsLoading } from "@/components/Loading/redux";
import { AppDispatch } from "@/redux/config/configStore";
import { GetCourseListBody, getCourseList } from "./api";
import { setCourseCategoryGrid } from "@/modules/course/redux";
import { CourseCategory } from "@/modules/course/redux/model";

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

// export const addCourseCategory =
// 	(clinicDetail: ClinicDetail) => async (dispatch: AppDispatch) => {
// 		const data = await dispatch(
// 			createClinicApi({
// 				clinicCode: clinicDetail.clinicCode,
// 				clinicName: clinicDetail.clinicName,
// 				isActive: clinicDetail.isActive,
// 			})
// 		);
// 		if (_.get(data.payload, "error.message") === "Rejected") {
// 			return;
// 		} else {
// 			dispatch(setIsOpenDialog(true));
// 		}
// 	};
