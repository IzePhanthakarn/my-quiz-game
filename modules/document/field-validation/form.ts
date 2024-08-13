import {
	maxRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const documentNameName = "Document Name";
export const remarkName = "Remark";
export const isNecessaryName = "Is Necessary";
export const disabledName = "Disabled";

export const documentRules = {
	documentNameSchema: [
		requiredRule(documentNameName),
		maxRule(documentNameName, 200),
	],
	remarkSchema: [maxRule(remarkName, 400)],
	isNecessarySchema: [
		maxRule(isNecessaryName, 1),
		requiredRule(isNecessaryName),
	],
	disabledSchema: [maxRule(disabledName, 1)],
};
