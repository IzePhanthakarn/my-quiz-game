import {
	requiredRule,
	// equalLengthRule,
	// minRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { organSystemWpiName } from "../interfaces/name";

export const organSystemWpiFormRules = {
	description: [
		requiredRule(organSystemWpiName.description),
		maxRule(organSystemWpiName.description, 200),
	],
	organSystemNo: [
		requiredRule(organSystemWpiName.organSystemNo),
		maxRule(organSystemWpiName.organSystemNo, 2),
	],
};
