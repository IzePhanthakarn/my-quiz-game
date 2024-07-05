const API_PATH = {
	GET_CLINIC_DETAIL: "/getClinicList",
	GET_CLINIC_PAGE: "/getClinicListPage",
	GET_CLINIC: "/getClinicListByCodeName",
	CREATE_CLINIC: "/createClinic",
	UPDATE_CLINIC: "/patchClinic",

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
