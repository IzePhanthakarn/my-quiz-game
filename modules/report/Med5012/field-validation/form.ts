import {
	maxRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const ssoCodeName = "ssoCode";
export const investigrationDateName = "investigrationDate";
export const isNecessaryName = "Is Necessary";
export const disabledName = "Disabled";

export const reportRules = {
	ssoCodeSchema: [
		requiredRule(ssoCodeName), 
	],
	investigrationDateSchema: [
		requiredRule(investigrationDateName), 
	], 
	isNecessarySchema: [
		maxRule(isNecessaryName, 1),
		requiredRule(isNecessaryName),
	],
	disabledSchema: [maxRule(disabledName, 1)],
};
