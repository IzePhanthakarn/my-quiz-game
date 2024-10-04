export enum SESSION_NAME {
	DEFAULT = "",
	DIPLOMA = "diploma",
	HOSPITAL_TYPE = "hospitalType",
	HOSPITAL_CATEGORY = "hospitalCategory",
	DOCTOR_BANK = "doctorBank",
	TRAINING = "training",
	HOSPITAL = "hospital",
	JOB_TYPE = "jobType",
	ADDRESS = "address",
	TITLE = "title",
	DOCTOR_TYPE = "doctorType",
	POSTAL_ID = "postalId",
	PROVINCE_NAME = "provinceName",
	SSO_PROJECT = "ssoProject",
	COURSE_CATEGORY = "courseCategory",
}

export enum API_METHOD {
	GET = "GET",
	POST = "POST",
}

export enum REPORT {
	PDF = "PDF",
	EXCEL = "EXCEL",
}

export const DROPDOWN = {
	[SESSION_NAME.DIPLOMA]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/diploma`,
		sessionName: SESSION_NAME.DIPLOMA,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.HOSPITAL_TYPE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/lt-properties/list`,
		sessionName: SESSION_NAME.HOSPITAL_TYPE,
		method: API_METHOD.POST,
		baseBody: { groupNameLike: "HOSPITAL_TYPE" },
	},
	[SESSION_NAME.HOSPITAL_CATEGORY]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/lt-properties/list`,
		sessionName: SESSION_NAME.HOSPITAL_CATEGORY,
		method: API_METHOD.POST,
		baseBody: { groupNameLike: "HOSPITAL_CATEGORY" },
	},
	[SESSION_NAME.COURSE_CATEGORY]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/course-category/dropdown`,
		sessionName: SESSION_NAME.COURSE_CATEGORY,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.SSO_PROJECT]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/med-lt-properties/?groupName=SSO_PROJECT`,
		sessionName: SESSION_NAME.SSO_PROJECT,
		method: API_METHOD.GET,
		baseBody: undefined,
	},

	[SESSION_NAME.DOCTOR_BANK]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/doctor-bank/dropdown`,
		sessionName: SESSION_NAME.DOCTOR_BANK,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.TRAINING]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/training`,
		sessionName: SESSION_NAME.TRAINING,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.HOSPITAL]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/hospital/dropdown`,
		sessionName: SESSION_NAME.HOSPITAL,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.JOB_TYPE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/med-lt-properties/?groupName=JOB_TYPE`,
		sessionName: SESSION_NAME.JOB_TYPE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.ADDRESS]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/address/list`,
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.POSTAL_ID]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/address/list`,
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.PROVINCE_NAME]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/address/list`,
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.TITLE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/title`,
		sessionName: SESSION_NAME.TITLE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.DOCTOR_TYPE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL}/master/med-lt-properties/?groupName=DOCTOR_TYPE`,
		sessionName: SESSION_NAME.DOCTOR_TYPE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.DEFAULT]: {
		apiPath: "",
		sessionName: "",
		method: API_METHOD.GET,
		baseBody: undefined,
	},
};

export const DROPDOWN_REPOT = [
	{
		label: REPORT.PDF,
		value: REPORT.PDF,
	},
	{
		label: REPORT.EXCEL,
		value: REPORT.EXCEL,
	},
];
