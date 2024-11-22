import {
	maxRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const ssoCodeName = "ssoCode";
export const cancelDatekName = "cancelDate";
export const isNecessaryName = "Is Necessary";
export const disabledName = "Disabled";

export const reportRules = {
	ssoCodeSchema: [
		requiredRule(ssoCodeName), 
	],
	cancelDateSchema: [
		requiredRule(cancelDatekName), 
	], 
	isNecessarySchema: [
		maxRule(isNecessaryName, 1),
		requiredRule(isNecessaryName),
	],
	disabledSchema: [maxRule(disabledName, 1)],
};
