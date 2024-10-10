import {
	equalLengthRule,
	maxRule,
	minRule,
	onlyNumberRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { doctorDataName } from "../interfaces/names";

export const rules = {
	professionalCodeSchema: [
		requiredRule(doctorDataName.professionalCode),
		maxRule(doctorDataName.professionalCode, 5),
		onlyNumberRule(doctorDataName.professionalCode),
	],
	courseCategorySchema: [requiredRule(doctorDataName.courseCategory)],
	doctorCodeSchema: [
		requiredRule(doctorDataName.doctorCode),
		maxRule(doctorDataName.doctorCode, 10),
	],
	citizenIdSchema: [
		requiredRule(doctorDataName.citizenId),
		onlyNumberRule(doctorDataName.citizenId),
		equalLengthRule(doctorDataName.doctorCode, 13),
	],
	titleSchema: [requiredRule(doctorDataName.title)],
	firstNameSchema: [
		requiredRule(doctorDataName.firstname),
		maxRule(doctorDataName.firstname, 50),
	],
	lastNameSchema: [
		requiredRule(doctorDataName.lastname),
		maxRule(doctorDataName.lastname, 50),
	],
	doctorTypeSchema: [requiredRule(doctorDataName.doctorType)],
	revenueNoSchema: [maxRule(doctorDataName.revenueNo, 10)],
	phoneNumberSchema: [
		maxRule(doctorDataName.phoneNumber, 10),
		onlyNumberRule(doctorDataName.phoneNumber),
	],
	houseNumSchema: [maxRule(doctorDataName.houseNum, 10)],
	mooSchema: [maxRule(doctorDataName.moo, 10)],
	roadSchema: [maxRule(doctorDataName.road, 10)],
	soiSchema: [maxRule(doctorDataName.soi, 10)],
	tambolSchema: [maxRule(doctorDataName.tambol, 4)],
	amphurSchema: [maxRule(doctorDataName.amphur, 4)],
	provinceSchema: [maxRule(doctorDataName.province, 2)],
	postcodeSchema: [maxRule(doctorDataName.postcode, 5)],
};
