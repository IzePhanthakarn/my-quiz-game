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
		GET_ORGAN_LIST: "/medMsOrganSystemWpi/list",
		GET_ORGAN_RECORD: "/medMsOrganSystemWpi",
	},
	// COURSE
	COURSE: {
		GET_COURSE_LIST: "/medMsCourseCategory/list",
		GET_COURSE_RECORD: "/medMsCourseCategory",
	},
};

export default API_PATH;
