export enum DROPDOWN_TYPE {
	DEFAULT = "",
	DIPLOMA = "DIPLOMA",
	HOSPITAL_TYPE = "HOSPITAL_TYPE",
	HOSPITAL_CATEGORY = "HOSPITAL_CATEGORY",
	DOCTOR_BANK = "DOCTOR_BANK",
	TRAINING = "TRAINING",
	HOSPITAL = "HOSPITAL",
	JOB_TYPE = "JOB_TYPE",
	ADDRESS = "ADDRESS",
	TITLE = "TITLE",
	DOCTOR_TYPE = "DOCTOR_TYPE",
	POSTAL_ID = "POSTAL_ID",
}

export enum API_METHOD {
	GET = "GET",
	POST = "POST",
}

export const DROPDOWN = {
	[DROPDOWN_TYPE.DIPLOMA]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/diploma",
		sessionName: DROPDOWN_TYPE.DIPLOMA,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.HOSPITAL_TYPE]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/lt-properties/list",
		sessionName: DROPDOWN_TYPE.HOSPITAL_TYPE,
		method: API_METHOD.POST,
		baseBody: { groupName: "HOSPITAL_TYPE" },
	},
	[DROPDOWN_TYPE.HOSPITAL_CATEGORY]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/hospital-category",
		sessionName: DROPDOWN_TYPE.HOSPITAL_CATEGORY,
		method: API_METHOD.POST,
		baseBody: { groupName: "HOSPITAL_CATEGORY" },
	},
	[DROPDOWN_TYPE.DOCTOR_BANK]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/doctor-bank",
		sessionName: DROPDOWN_TYPE.DOCTOR_BANK,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.TRAINING]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/training",
		sessionName: DROPDOWN_TYPE.TRAINING,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.HOSPITAL]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/hospital",
		sessionName: DROPDOWN_TYPE.HOSPITAL,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.JOB_TYPE]: {
		apiPath: `https://api-dev-wcf.soilfish.co/med/master/med-lt-properties/?groupName=JOB_TYPE`,
		sessionName: DROPDOWN_TYPE.JOB_TYPE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.ADDRESS]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/address/list",
		sessionName: DROPDOWN_TYPE.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.POSTAL_ID]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/address/list",
		sessionName: DROPDOWN_TYPE.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.TITLE]: {
		apiPath: "https://api-dev-wcf.soilfish.co/med/master/title",
		sessionName: DROPDOWN_TYPE.TITLE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.DOCTOR_TYPE]: {
		apiPath: `https://api-dev-wcf.soilfish.co/med/master/med-lt-properties/?groupName=DOCTOR_TYPE`,
		sessionName: DROPDOWN_TYPE.DOCTOR_TYPE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[DROPDOWN_TYPE.DEFAULT]: {
		apiPath: "",
		sessionName: "",
		method: API_METHOD.GET,
		baseBody: undefined,
	},
};
