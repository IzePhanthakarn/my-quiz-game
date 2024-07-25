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
	GET_DIPLOMA_DETAIL: "master/diploma",
	GET_DIPLOMA_PAGE: "master/diploma/list",
	CREATE_DIPLOMA: "master/diploma",
	UPDATE_DIPLOMA: "master/diploma",

	// ORGAN
	ORGAN_SYSTEM_WPI: {
		GET_ORGAN_SYSTEM_WPI_LIST: "/master/organ-system-wpi/list",
		GET_ORGAN_SYSTEM_WPI_RECORD: "/master/organ-system-wpi",
		ADD: "/master/organ-system-wpi",
		GET_BY_UUID: "/master/organ-system-wpi",
		UPDATE_BY_UUID: "/master/organ-system-wpi",
	},
	// COURSE
	COURSE_CATEGORY: {
		GET_COURSE_CATEGORY_LIST: "/master/course-category/list",
		GET_COURSE_CATEGORY_RECORD: "/master/course-category",
		ADD_COURSE_CATEGORY: "/master/course-category",
		GET_COURSE_CATEGORY_BY_UUID: "/master/course-category",
		UPDATE_COURSE_CATEGORY_BY_UUID: "/master/course-category",
	},
	COURSE_CERTIFICATE: {
		GET_LIST: "/course/certificate/list",
		GET_RECORD: "/course/certificate",
		ADD: "/course/certificate",
		GET_BY_UUID: "/course/certificate",
		UPDATE_BY_UUID: "/course/certificate",
	},
	COURSE_ORGAN_SYSTEM_GROUP: {
		GET_LIST: "/course/organ-system-group/list",
		GET_RECORD: "/course/organ-system-group",
		ADD: "/course/organ-system-group",
		GET_BY_UUID: "/course/organ-system-group",
		UPDATE_BY_UUID: "/course/organ-system-group",
	},

	MINIO: {
		UPLOAD: "/api/files/upload",
		UPLOAD_MULTIPLE: "/api/files/upload-multiple",
		DOWNLOAD: "/api/files/download/",
	},
};

export default API_PATH;
