export interface SsoUser {
	userId: number;
	login: string;
	firstName: string;
	lastName: string;
	email: string;
	ssoBranchCode: string;
	lastLoginDate: string;
	type: string;
	active: string;
	title: string;
	investigateCode: string;
	workingDeptDescription: string;
	workingDeptNo: string;
	employeeType: string;
	ssoPersonPosition: string;
	ssoPersonClass: string;
	titleEn: string;
	firstNameEn: string;
	lastNameEn: string;
	createdDate: string;
	createdBy: string;
	lastUpdatedDate: string;
	lastUpdatedBy: string;
	hasSecurityCode: string;
}

export interface SsoUserList {
	list: SsoUser[];
}

export const modelSsoUserList: SsoUserList = {
	list: [],
};

export const modelSsoUser: SsoUser = {
	userId: 0,
	login: "",
	firstName: "",
	lastName: "",
	email: "",
	ssoBranchCode: "",
	lastLoginDate: "",
	type: "",
	active: "",
	title: "",
	investigateCode: "",
	workingDeptDescription: "",
	workingDeptNo: "",
	employeeType: "",
	ssoPersonPosition: "",
	ssoPersonClass: "",
	titleEn: "",
	firstNameEn: "",
	lastNameEn: "",
	createdDate: "",
	createdBy: "",
	lastUpdatedDate: "",
	lastUpdatedBy: "",
	hasSecurityCode: "",
};
