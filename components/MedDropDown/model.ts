import { IsActive } from "wcf-component-lib/src/constants/constants";

export enum SESSION_NAME {
	DEFAULT = "",
	DIPLOMA = "diploma",
	HOSPITAL_TYPE = "hospitalType",
	HOSPITAL_CATEGORY = "hospitalCategory",
	HOSPITAL_LIST_WCF_PLATFORM = "hospitalListWcfPlatform",
	DOCTOR_BANK = "doctorBank",
	HOSPITAL_WCF_CODE_VALUE = "hospitalWcfCodeValue",
	HOSPITAL = "hospital",
	JOB_TYPE = "jobType",
	ADDRESS = "address",
	TITLE = "title",
	DOCTOR_TYPE = "doctorType",
	POSTAL_ID = "postalId",
	PROVINCE_NAME = "provinceName",
	SSO_PROJECT = "ssoProject",
	COURSE_CATEGORY = "courseCategory",
	SSO_BRANCH = "ssoBranch",
	SSO_BRANCH_PROVINCE = "ssoBranchProvince",
	SSO_BRANCH_PROVINCE_CODENAME = "ssoBranchProvinceCodeName",
	BANK = "bank",
	BANK_BRANCH = "bankBranch",
	HOSPITAL_ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER = "hospitalAnnouncedPriceDetailCategoryMaster",
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
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/diploma`,
		sessionName: SESSION_NAME.DIPLOMA,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.SSO_BRANCH]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/sso-branch/dropdown`,
		sessionName: SESSION_NAME.SSO_BRANCH,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.SSO_BRANCH_PROVINCE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/sso-branch/dropdown`,
		sessionName: SESSION_NAME.SSO_BRANCH,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.SSO_BRANCH_PROVINCE_CODENAME]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/sso-branch/dropdown`,
		sessionName: SESSION_NAME.SSO_BRANCH,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.HOSPITAL_TYPE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/lt-properties/list`,
		sessionName: SESSION_NAME.HOSPITAL_TYPE,
		method: API_METHOD.POST,
		baseBody: { groupNameLike: "HOSPITAL_TYPE" },
	},
	[SESSION_NAME.HOSPITAL_CATEGORY]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/lt-properties/list`,
		sessionName: SESSION_NAME.HOSPITAL_CATEGORY,
		method: API_METHOD.POST,
		baseBody: { groupNameLike: "HOSPITAL_CATEGORY" },
	},
	[SESSION_NAME.HOSPITAL_LIST_WCF_PLATFORM]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/hospital/hospital-assessment/GetHospitalList`,
		sessionName: SESSION_NAME.HOSPITAL_LIST_WCF_PLATFORM,
		method: API_METHOD.POST,
		baseBody: undefined,
	},
	[SESSION_NAME.COURSE_CATEGORY]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/course-category/dropdown`,
		sessionName: SESSION_NAME.COURSE_CATEGORY,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.SSO_PROJECT]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/med-lt-properties/?groupName=SSO_PROJECT`,
		sessionName: SESSION_NAME.SSO_PROJECT,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.DOCTOR_BANK]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/doctor-bank/dropdown`,
		sessionName: SESSION_NAME.DOCTOR_BANK,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.BANK]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/bank/dropdown`,
		sessionName: SESSION_NAME.BANK,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.BANK_BRANCH]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/bank-branch/dropdown`,
		sessionName: SESSION_NAME.BANK_BRANCH,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.HOSPITAL]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/hospital/dropdown`,
		sessionName: SESSION_NAME.HOSPITAL,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.HOSPITAL_WCF_CODE_VALUE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/hospital/dropdown`,
		sessionName: SESSION_NAME.HOSPITAL,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.JOB_TYPE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/med-lt-properties/?groupName=JOB_TYPE`,
		sessionName: SESSION_NAME.JOB_TYPE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.ADDRESS]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/address/list`,
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.POSTAL_ID]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/address/list`,
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.PROVINCE_NAME]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/address/list`,
		sessionName: SESSION_NAME.ADDRESS,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.TITLE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/title`,
		sessionName: SESSION_NAME.TITLE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.DOCTOR_TYPE]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/master/med-lt-properties/?groupName=DOCTOR_TYPE`,
		sessionName: SESSION_NAME.DOCTOR_TYPE,
		method: API_METHOD.GET,
		baseBody: undefined,
	},
	[SESSION_NAME.HOSPITAL_ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER]: {
		apiPath: `${process.env.NEXT_PUBLIC_API_URL_MED}/hospital-announced-price-files/announced-price-detail-category-master/list`,
		sessionName: SESSION_NAME.HOSPITAL_ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER,
		method: API_METHOD.POST,
		baseBody: {
			pagination: {
				totalData: 0,
				pageNumber: 0,
				pageSize: 9999,
				orders: [{ direction: "DESC", property: "updatedDate" }],
			},
			nameLike: "",
			unitNameLike: "",
			runningCodeLike: "",
			checkName: false,
			checkUnitName: false,
			checkRunningCode: false,
			isActive: "Y",
			checkIsActive: false,
		},
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

export const DROPDOWN_ISACTIVE = [
	{
		label: "ทั้งหมด",
		value: null,
	},
	{
		label: "ใช้งาน",
		value: IsActive.Y,
	},
	{
		label: "ไม่ใช้งาน",
		value: IsActive.N,
	},
];

export enum ANNOUNCED_PRICE_FILE_UPLOAD_STATUS {
	UPLOADING = "UPLOADING",
	ERROR = "ERROR",
	DONE = "DONE",
}

export const DROPDOWN_ANNOUNCED_PRICE_FILE_UPLOAD_STATUS = [
	{
		label: "ทั้งหมด",
		value: "",
	},
	{
		label: "กำลังอัพโหลด",
		value: ANNOUNCED_PRICE_FILE_UPLOAD_STATUS.UPLOADING,
	},
	{
		label: "ผิดพลาด",
		value: ANNOUNCED_PRICE_FILE_UPLOAD_STATUS.ERROR,
	},
	{
		label: "สำเร็จ",
		value: ANNOUNCED_PRICE_FILE_UPLOAD_STATUS.DONE,
	},
];

export const HOSPITAL_ASSESSMENT_RESULT_STATUS = [
	{
		label: "ผ่าน",
		value: "P",
	},
	{
		label: "ดำเนินการตามคำแนะนำ",
		value: "S",
	},
];

export const HOSPITAL_ASSESSMENT_ASSESS_TYPE = [
	{
		label: "ตรวจรับใหม่",
		value: "1",
	},
	{
		label: "ตรวจแนะนำ",
		value: "2",
	},
];
