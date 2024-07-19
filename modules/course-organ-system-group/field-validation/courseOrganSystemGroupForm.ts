import {
	requiredRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const courseOrganSystemGroupRules = {
	courseCategorySchema: [
		requiredRule("Course Category"),
		maxRule("Course Category", 1),
	],

	organSystemGroupSchema: [maxRule("Organ System Group", 2)],
	organSystemNoSchema: [maxRule("Organ System No", 2)],
};
