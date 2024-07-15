import {
	requiredRule,
	equalLengthRule,
	minRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const diplomaTypeSchema = [
	requiredRule("Diploma Type"),
	equalLengthRule("Diploma Type", 4),
];

export const diplomaNameSchema = [
	requiredRule("Diploma Name"),
	minRule("Diploma Name", 1),
	maxRule("Diploma Name", 200),
];
