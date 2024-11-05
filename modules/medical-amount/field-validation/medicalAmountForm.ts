import {
	maxRule,
	onlyDecimalRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { medicalAmountName } from "../interfaces/names";

export const medicalAmountRules = {
	noticeSchema: [maxRule(medicalAmountName.notice, 200)],
	endEffectiveDateSchema: [requiredRule(medicalAmountName.endEffectiveDate)],

	startEffectiveDateSchema: [
		requiredRule(medicalAmountName.startEffectiveDate),
	],

	amountSchema: [
		onlyDecimalRule(medicalAmountName.amount),
		requiredRule(medicalAmountName.amount),
	],

	fareAmountSchema: [
		onlyDecimalRule(medicalAmountName.fareAmount),
		requiredRule(medicalAmountName.fareAmount),
	],

	amountLimitSchema: [
		onlyDecimalRule(medicalAmountName.amountLimit),
		requiredRule(medicalAmountName.amountLimit),
	],
};
