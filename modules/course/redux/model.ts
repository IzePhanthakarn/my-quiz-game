import { CourseManipulate, modelCourseManipulate } from "./manipulate/model";

export interface Course {
	manipulate: CourseManipulate;
}

export const modelCourse: Course = {
	manipulate: modelCourseManipulate,
};
