import _ from "lodash";
import {
	Address,
	Diploma,
	DoctorHospital,
	Option,
} from "wcf-component-lib/src/components/BaseDropDown/model";
import { LtPropertiesList } from "wcf-component-lib/src/components/BaseDropDown/service/api";
import { SESSION_NAME } from "../model";
import { Bank, BankBranch, CourseCategory, SsoBranch, Title } from "./model";

export const handleOption = (type: SESSION_NAME, result: any) => {
	let option = null;
	switch (type) {
		case SESSION_NAME.DIPLOMA:
			option = result.map((e: Diploma) => ({
				label: `${e.diplomaType.trim()}-${e.diplomaName}`,
				value: e.diplomaType,
			}));
			break;
		case SESSION_NAME.SSO_BRANCH:
			option = result.map((e: SsoBranch) => ({
				label: `${e.ssoBranchCode} ${e.provinceName}`,
				value: e.ssoBranchCode,
			}));
			break;
		case SESSION_NAME.SSO_BRANCH_PROVINCE:
			option = result.map((e: SsoBranch) => ({
				label: `${e.ssoBranchCode} ${e.provinceName}`,
				value: `${e.provinceCode}-${e.provinceName}`,
			}));
			break;
		case SESSION_NAME.SSO_BRANCH_PROVINCE_CODENAME:
			option = result.map((e: SsoBranch) => ({
				label: `${e.ssoBranchCode} ${e.provinceName}`,
				value: `${e.ssoBranchCode}-${e.provinceName}`,
			}));
			break;
		case SESSION_NAME.COURSE_CATEGORY:
			option = result.map((e: CourseCategory) => ({
				label: e.categoryDescription,
				value: e.courseCategory,
			}));
			break;
		case SESSION_NAME.HOSPITAL:
			option = result.map((e: DoctorHospital) => ({
				label: `${e.hospitalWcfCode}-${e.hospitalName}`,
				value: `${e.hospitalWcfCode}-${e.hospitalName}`,
			}));
			break;
		case SESSION_NAME.ADDRESS:
			option = result.map((e: Address) => ({
				value: `${e.tambolCode}/${e.postalCode}`,
				label:
					e.tambolName +
					" > " +
					e.amphurName +
					" > " +
					e.provinceName +
					" > " +
					e.postalCode,
			}));
			break;
		case SESSION_NAME.POSTAL_ID:
			option = result.map((e: Address) => ({
				value: `${e.tambolCode}/${e.postalCode}`,
				label: e.postalId + "-" + e.postalName,
			}));
			break;
		case SESSION_NAME.PROVINCE_NAME:
			const provinceName = _.map(option, (e: Address) => ({
				value: e.provinceCode,
				label: e.provinceName,
			}));
			option = _.uniqBy(provinceName, "provinceCode"); // กรองซ้ำตาม provinceCode
			break;
		case SESSION_NAME.HOSPITAL_TYPE:
		case SESSION_NAME.HOSPITAL_CATEGORY:
			option = result.content.map((e: LtPropertiesList) => ({
				value: e.propertyCode,
				label: e.propertyText,
			}));
			break;
		case SESSION_NAME.JOB_TYPE:
		case SESSION_NAME.SSO_PROJECT:
		case SESSION_NAME.DOCTOR_TYPE:
			option = result.map((e: LtPropertiesList) => ({
				value: e.propertyCode,
				label: e.propertyText,
			}));
			break;
		case SESSION_NAME.TITLE:
			option = result.map((e: Title) => ({
				label: e.titleName,
				value: e.titleCode,
			}));
			break;
		case SESSION_NAME.BANK:
			option = result.map((e: Bank) => ({
				label: e.bankName,
				value: e.bankCode,
			}));
			break;
		case SESSION_NAME.BANK_BRANCH:
			option = result.map((e: BankBranch) => ({
				label: e.bankBranchName,
				value: e.bankBranchCode,
			}));
			break;
		default:
			return [];
	}
	return option;
};
