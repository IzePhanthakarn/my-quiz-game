const API_PATH = {
	// LOGIN
	GET_ACCESS_TOKEN: "https://api-dev-wcf.soilfish.co/auth/user/token",

	// CLINIC
	GET_CLINIC_DETAIL: "master/clinic",
	GET_CLINIC_PAGE: "master/clinic/list",
	GET_CLINIC: "/getClinicListByCodeName",
	CREATE_CLINIC: "master/clinic",
	UPDATE_CLINIC: "master/clinic",

	// DIPLOMA
	GET_DIPLOMA_PAGE: "master/diploma/list",

	// ORGAN
	ORGAN: {
		GET_ORGAN_SYSTEM_WPI_LIST: "/master/organ-system-wpi/list",
		GET_ORGAN_SYSTEM_WPI_RECORD: "/master/organ-system-wpi",
	},
	// COURSE
	COURSE: {
		GET_COURSE_CATEGORY_LIST: "/master/course-category/list",
		GET_COURSE_CATEGORY_RECORD: "/master/course-category",
	},
};

export default API_PATH;
