import {
	maxRule,
	onlyDecimalRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const medicalAmountRules = {
	noticeSchema: [maxRule("notice", 200)],

	amountSchema: [onlyDecimalRule("Amount")],
	fareAmountSchema: [onlyDecimalRule("Fare Amount")],
	amountLimitSchema: [onlyDecimalRule("Amount Limit")],

	// amountSchema: [],
	// fareAmountSchema: [],
	// amountLimitSchema: [],
};
