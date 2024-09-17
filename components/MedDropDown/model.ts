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
}

export enum API_METHOD {
	GET = "GET",
	POST = "POST",
}

export const DROPDOWN = {
	[SESSION_NAME.DIPLOMA]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/diploma",
		sessionName: SESSION_NAME.DIPLOMA,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.HOSPITAL_TYPE]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/lt-properties/list",
		sessionName: SESSION_NAME.HOSPITAL_TYPE,
		method: API_METHOD.POST,
		baseBody: { groupNameLike: "HOSPITAL_TYPE" },
	},
	[SESSION_NAME.HOSPITAL_CATEGORY]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/hospital-category",
		sessionName: SESSION_NAME.HOSPITAL_CATEGORY,
		method: API_METHOD.POST,
		baseBody: { groupNameLike: "HOSPITAL_CATEGORY" },
	},
	[SESSION_NAME.DOCTOR_BANK]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/doctor-bank",
		sessionName: SESSION_NAME.DOCTOR_BANK,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.TRAINING]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/training",
		sessionName: SESSION_NAME.TRAINING,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.HOSPITAL]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/hospital",
		sessionName: SESSION_NAME.HOSPITAL,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.JOB_TYPE]: {
		apiPath: `https://api-dev-wcf.soilfish.co/med/master/med-lt-properties/?groupName=JOB_TYPE`,
		sessionName: SESSION_NAME.JOB_TYPE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.ADDRESS]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/address/list",
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.POSTAL_ID]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/address/list",
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.PROVINCE_NAME]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/address/list",
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.TITLE]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/title",
		sessionName: SESSION_NAME.TITLE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.DOCTOR_TYPE]: {
		apiPath: `https://api-dev-wcf.soilfish.co/med/master/med-lt-properties/?groupName=DOCTOR_TYPE`,
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
