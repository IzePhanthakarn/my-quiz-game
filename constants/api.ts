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
