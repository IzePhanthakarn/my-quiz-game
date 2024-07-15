import {
	requiredRule,
	equalLengthRule,
	minRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const courseCategoryRules = {
	categoryDescriptionSchema: [
		requiredRule("Category Description"),
		maxRule("Category Description", 200),
	],
	categorySubDescSchema: [maxRule("Category SubDesc", 400)],
	courseCategorySchema: [
		requiredRule("Course Category"),
		maxRule("Course Category", 2),
	],
	formatCodeSchema: [maxRule("Format Code", 200)],
	organizeGroupCodeSchema: [maxRule("Organize Group Code", 2)],
	organizeSubGroupCodeSchema: [maxRule("Organize Sub Group Code", 3)],
	situationSchema: [maxRule("situation", 2)],
};
