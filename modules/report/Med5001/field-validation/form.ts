import {
	maxRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const ssoCodeName = "ssoCode";
export const payDatekName = "payDate";
export const isNecessaryName = "Is Necessary";
export const disabledName = "Disabled";

export const reportRules = {
	ssoCodeSchema: [
		requiredRule(ssoCodeName), 
	],
	payDateSchema: [
		requiredRule(payDatekName), 
	], 
	isNecessarySchema: [
		maxRule(isNecessaryName, 1),
		requiredRule(isNecessaryName),
	],
	disabledSchema: [maxRule(disabledName, 1)],
};
