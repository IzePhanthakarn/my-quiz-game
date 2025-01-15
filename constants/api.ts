const API_PATH = {
	// REPORT
	REPORT_PDF: "/pdf",
	REPORT_EXCEL: "/excel",
	REPORT_LIST: "/list",
	SSO_USER: "http://192.168.5.92/ums/users",

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

	// DOCTOR
	GET_DOCTOR_DETAIL: "doctor",
	GET_DOCTOR_PAGE: "doctor/list",
	CREATE_DOCTOR: "doctor",
	UPDATE_DOCTOR: "doctor",
	GET_DOCTOR_FORM: "doctor/getForm",
	GET_DOCTOR_HISOTRY_COMPARE_LIST: "doctor/history/compare/list",
	GET_DOCTOR_HISOTRY_COMPARE_RELATION_LIST:
		"doctor/history/compare/relation/list",
	GET_DOCTOR_HISOTRY_COMPARE_FILTER: "doctor/history/compare/filter",
	GET_DOCTOR_HISOTRY_COMPARE_ALL: "doctor/history/compare/all",
	IMPORT_DOCTOR_XLSX: "doctor/import/xlsx",
	// DOCTOR TEMPLATE
	GET_DOCTOR_TEMPLATE: "doctor/download",

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
	MEDICAL_AMOUNT: {
		GET_LIST: "/master/medical-amount/list",
		GET_RECORD: "/master/medical-amount",
		ADD: "/master/medical-amount",
		GET_BY_UUID: "/master/medical-amount",
		UPDATE_BY_UUID: "/master/medical-amount",
	},
	LT_PROPERTIES: {
		GET_LIST: "/master/lt-properties/list",
		GET_RECORD: "/master/lt-properties",
		ADD: "/master/lt-properties",
		GET_BY_UUID: "/master/lt-properties",
		UPDATE_BY_UUID: "/master/lt-properties",
	},
	HOSPITAL: {
		GET_LIST: "/hospital/list",
		GET_RECORD: "/hospital",
		ADD: "/hospital",
		GET_BY_UUID: "/hospital",
		UPDATE_BY_UUID: "/hospital",
		UPLOAD_SP7: "/hospital-sp7",
		EXPORT_PAGES: {
			MED5008: "/hospital/export/med5008",
			MED5012: "/hospital/excel/med5012",
		},
		EXPORT_PDF: {
			MED5012: "/hospital/pdf/med5012",
		},
		SP7: {
			GET_LIST: "/hospital-sp7/list",
			UPDATE_BY_UUID: "/hospital-sp7",
			GET_LIST_BY_HOSPITAL_UUID: "/hospital-sp7/list-by-hospital-uuid",
			TODO_LIST: "/hospital/sp7-end",
		},
		SP19: {
			GET_LIST: "/hospital-sp19/list",
			UPDATE_BY_UUID: "/hospital-sp19",
			GET_LIST_BY_HOSPITAL_UUID: "/hospital-sp19/list-by-hospital-uuid",
			TODO_LIST: "/hospital/sp19-end",
		},
		ETC_FILES: {
			GET_LIST: "/hospital-etc-files/list",
			UPDATE_BY_UUID: "/hospital-etc-files",
			GET_LIST_BY_HOSPITAL_UUID: "/hospital-etc-files/list-by-hospital-uuid",
		},
		ATTACHMENT: {
			GET_LIST: "/hospital-attachment/list",
			UPDATE_BY_UUID: "/hospital-attachment",
			GET_LIST_BY_HOSPITAL_WCF_CODE:
				"/hospital-attachment/list-by-hospital-wcf-code",
			GET_LIST_BY_HOSPITAL_WCF_CODE_AND_FIELD_NAME:
				"/hospital-attachment/list-by-hospital-wcf-code-and-field-name",
		},
		ANNOUNCED_PRICE: {
			GET_LIST: "/hospital-announced-price-files/list",
			UPDATE_BY_UUID: "/hospital-announced-price-files",
			GET_LIST_BY_HOSPITAL_UUID:
				"/hospital-announced-price-files/list-by-hospital-uuid",
			UPLOAD: "/hospital-announced-price-files/upload",
			DOWNLOAD_TEMPLATE_FILE:
				"/hospital-announced-price-files/download-template-file",
			SET_ANNOUNCED_PRICE_FILE_INACTIVE:
				"/hospital-announced-price-files/set-announced-price-file-inactive",
			ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER: {
				GET_LIST:
					"/hospital-announced-price-files/announced-price-detail-category-master/list",
				GET_RECORD:
					"/hospital-announced-price-files/announced-price-detail-category-master",
				ADD: "/hospital-announced-price-files/announced-price-detail-category-master",
				GET_BY_UUID:
					"/hospital-announced-price-files/announced-price-detail-category-master",
				UPDATE_BY_UUID:
					"/hospital-announced-price-files/announced-price-detail-category-master",
			},
			ANNOUNCED_PRICE_DETAIL_MASTER: {
				GET_LIST:
					"/hospital-announced-price-files/announced-price-detail-master/list",
				GET_RECORD:
					"/hospital-announced-price-files/announced-price-detail-master",
				ADD: "/hospital-announced-price-files/announced-price-detail-master",
				GET_BY_UUID:
					"/hospital-announced-price-files/announced-price-detail-master",
				UPDATE_BY_UUID:
					"/hospital-announced-price-files/announced-price-detail-master",
			},
			ANNOUNCED_PRICE_FILE_UPLOAD_STATUS: {
				GET_LIST:
					"/hospital-announced-price-files/announced-price-file-upload-status-list",
			},
		},
		HOSPITAL_STAFF_CONTACT: {
			GET_LIST: "/hospital-staff-contact/list",
			UPDATE_BY_UUID: "/hospital-staff-contact",
			GET_LIST_BY_HOSPITAL_UUID:
				"/hospital-staff-contact/list-by-hospital-uuid",
		},
		HISTORY: {
			COMPARE_VERSION: "/hospital-history/compare-version",
			EDIT_TIMES_LIST: "/hospital-history/edit-times-list",
			EDIT_TIMES_ANNOUNCED_PRICE_FILES_HISTORY_LIST:
				"/hospital-history/edit-times-announced-price-files-history-list",
			COMPARE_ANNOUNCED_PRICE_FILES_VERSION:
				"/hospital-history/compare-announced-price-files-version",
		},
		ESTIMATE: {
			LIST: "/hospital/estimate/getAssessHospitalList",
			DETAIL: "/hospital/estimate/getAssessHospitalByID",
		},
	},
	DOCUMENT: {
		GET_LIST: "/master/document/list",
		GET_RECORD: "/master/document",
		ADD: "/master/document",
		GET_BY_UUID: "/master/document",
		UPDATE_BY_UUID: "/master/document",
	},
	REQUEST_FORM: {
		CREATE: "/request-form",
		UPDATE: "/request-form",
		GET_LIST: "/request-form/list",
		GET_BY_UUID: "/request-form",
	},
};

export default API_PATH;
