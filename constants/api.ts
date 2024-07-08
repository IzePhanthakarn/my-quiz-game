const API_PATH = {
	GET_CLINIC_DETAIL: "master/clinic",
	GET_CLINIC_PAGE: "master/clinic/list",
	GET_CLINIC: "/getClinicListByCodeName",
	CREATE_CLINIC: "master/clinic",
	UPDATE_CLINIC: "master/clinic",

	// DIPLOMA
	GET_DIPLOMA_PAGE: "/medMsDiploma/list",

	// ORGAN
	ORGAN: {
		GET_ORGAN_SYSTEM_WPI_LIST: "/master/organSystemWpi/list",
		GET_ORGAN_SYSTEM_WPI_RECORD: "/master/organSystemWpi",
	},
	// COURSE
	COURSE: {
		GET_COURSE_CATEGORY_LIST: "/master/courseCategory/list",
		GET_COURSE_CATEGORY_RECORD: "/master/courseCategory",
	},
};

export default API_PATH;
