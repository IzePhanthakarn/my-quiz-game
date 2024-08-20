import {
	maxRule,
	onlyNumberRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { names } from "../interfaces/names";

export const rules = {
	hospitalWcfCodeSchema: [
		requiredRule(names.hospitalWcfCode),
		maxRule(names.hospitalWcfCode, 10),
		onlyNumberRule(names.hospitalWcfCode),
	],
	hospitalDbmsCodeSchema: [
		maxRule(names.hospitalDbmsCode, 7),
		onlyNumberRule(names.hospitalWcfCode),
	],
	hospitalMinistryCodeSchema: [
		maxRule(names.hospitalMinistryCode, 9),
		onlyNumberRule(names.hospitalWcfCode),
	],
	hospitalNameSchema: [
		requiredRule(names.hospitalName),
		maxRule(names.hospitalName, 200),
	],
	oldHospitalNameSchema: [maxRule(names.oldHospitalName, 200)],
	belongToSchema: [maxRule(names.belongTo, 5)],
	numberOfBedSchema: [onlyNumberRule(names.numberOfBed)],
	bpsSchema: [onlyNumberRule(names.bps)],
	hospitalTypeSchema: [
		maxRule(names.hospitalType, 1),
		requiredRule(names.hospitalName),
	],
	hospitalCategorySchema: [
		maxRule(names.hospitalCategory, 1),
		requiredRule(names.hospitalName),
	],
	companyNameSchema: [maxRule(names.companyName, 200)],
	revenueRegistrationCodeSchema: [maxRule(names.revenueRegistrationCode, 13)],
	contractStartDateSchema: [],
	contractEndDateSchema: [],
	sp7StartDatedSchema: [],
	sp7EndDateSchema: [],
	sp19StartDateSchema: [],
	sp19EndDateSchema: [],
	levelChangeDateSchema: [],
	addressSchema: [maxRule(names.address, 300)],
	amphurCodeSchema: [
		requiredRule(names.amphurCode),
		maxRule(names.amphurCode, 4),
	],
	provinceCodeSchema: [
		requiredRule(names.provinceCode),
		maxRule(names.provinceCode, 2),
	],
	postalCodeSchema: [maxRule(names.postalCode, 5)],
	telephoneNumberSchema: [maxRule(names.telephoneNumber, 50)],
	faxNumberSchema: [maxRule(names.faxNumber, 50)],
	ssoPartnerSchema: [maxRule(names.ssoPartner, 1)],
	tempColumn2Schema: [maxRule(names.tempColumn2, 1)],
	tempColumn3Schema: [maxRule(names.tempColumn3, 1)],
	tempColumn4Schema: [maxRule(names.tempColumn4, 1)],
	tempColumn5Schema: [maxRule(names.tempColumn5, 1)],
	hospitalChangeNameDateSchema: [],
	hospitalListBoiSchema: [maxRule(names.hospitalListBoi, 1)],
	hospitalListBoiStartDateSchema: [],
	hospitalListBoiExpireDateSchema: [],
	tambolCodeSchema: [maxRule(names.tambolCode, 10)],
	remarkChangeNameSchema: [maxRule(names.remarkChangeName, 500)],
	ssoProjectSchema: [
		maxRule(names.ssoProject, 1),
		requiredRule(names.ssoProject),
	],
};
