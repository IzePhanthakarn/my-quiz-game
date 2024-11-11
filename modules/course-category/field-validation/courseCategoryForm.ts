import {
	requiredRule,
	// equalLengthRule,
	// minRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { courseCategoryName } from "../interfaces/name";

export const courseCategoryRules = {
	categoryDescriptionSchema: [
		requiredRule(courseCategoryName.categoryDescription),
		maxRule(courseCategoryName.categoryDescription, 200),
	],
	categorySubDescSchema: [maxRule(courseCategoryName.categorySubDesc, 400)],
	courseCategorySchema: [
		requiredRule(courseCategoryName.courseCategory),
		maxRule(courseCategoryName.courseCategory, 2),
	],
	formatCodeSchema: [maxRule(courseCategoryName.formatCode, 200)],
	organizeGroupCodeSchema: [maxRule(courseCategoryName.organizeGroupCode, 2)],
	organizeSubGroupCodeSchema: [
		maxRule(courseCategoryName.organizeSubGroupCode, 3),
	],
	situationSchema: [maxRule(courseCategoryName.situation, 2)],
};
