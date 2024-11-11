import {
	requiredRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { courseOrganSystemGroupName } from "../interfaces/name";

export const courseOrganSystemGroupRules = {
	courseCategorySchema: [
		requiredRule(courseOrganSystemGroupName.courseCategory),
		maxRule(courseOrganSystemGroupName.courseCategory, 1),
	],

	organSystemGroupSchema: [
		maxRule(courseOrganSystemGroupName.organSystemGroup, 2),
	],

	organSystemNoSchema: [maxRule(courseOrganSystemGroupName.organSystemNo, 2)],
};
