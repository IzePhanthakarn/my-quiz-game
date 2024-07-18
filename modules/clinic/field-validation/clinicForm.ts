import {
	requiredRule,
	equalLengthRule,
	minRule,
	maxRule,
	onlyNumberRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const clinicCodeSchema = [
	requiredRule("Clinic Code"),
	equalLengthRule("Clinic Code", 4),
	onlyNumberRule("Clinic Code"),
];

export const clinicNameSchema = [
	requiredRule("Clinic Name"),
	minRule("Clinic Name", 1),
	maxRule("Clinic Name", 200),
];
