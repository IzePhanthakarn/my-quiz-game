import {
	maxLengthRule,
	maxRule,
	onlyDecimalRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { medicalAmountName } from "../interfaces/names";

export const medicalAmountRules = {
	noticeSchema: [maxRule(medicalAmountName.notice, 100)],
	endEffectiveDateSchema: [requiredRule(medicalAmountName.endEffectiveDate)],

	startEffectiveDateSchema: [
		requiredRule(medicalAmountName.startEffectiveDate),
	],

	amountSchema: [
		onlyDecimalRule(medicalAmountName.amount),
		requiredRule(medicalAmountName.amount),
		maxLengthRule(medicalAmountName.amount, 6),
	],

	fareAmountSchema: [
		onlyDecimalRule(medicalAmountName.fareAmount),
		requiredRule(medicalAmountName.fareAmount),
		maxLengthRule(medicalAmountName.amount, 6),
	],

	amountLimitSchema: [
		onlyDecimalRule(medicalAmountName.amountLimit),
		requiredRule(medicalAmountName.amountLimit),
		maxLengthRule(medicalAmountName.amount, 6),
	],
};
