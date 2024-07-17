import {
	requiredRule,
	// equalLengthRule,
	// minRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const organSystemWpiFormRules = {
	description: [requiredRule("description"), maxRule("description", 200)],
	organSystemNo: [requiredRule("organSystemNo"), maxRule("organSystemNo", 2)],
};
