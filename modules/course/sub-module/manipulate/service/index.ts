import _ from "lodash";
import { setIsLoading } from "@/components/Loading/redux";
import { AppDispatch } from "@/redux/config/configStore";
import { GetCourseListBody, getCourseList } from "./api";
import { setCourseManipulateGrid } from "@/modules/course/redux";
import { CourseManipulate } from "@/modules/course/redux/manipulate/model";

export const fetchCourseList =
	(course: CourseManipulate) => async (dispatch: AppDispatch) => {
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
			setCourseManipulateGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};
