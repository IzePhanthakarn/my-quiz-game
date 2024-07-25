import {
	maxRule,
	onlyDecimalRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const medicalAmountRules = {
	noticeSchema: [maxRule("notice", 200)],
	endEffectiveDateSchema: [requiredRule("End Effective Date")],
	startEffectiveDateSchema: [requiredRule("End Effective Date")],

	amountSchema: [onlyDecimalRule("Amount")],
	fareAmountSchema: [onlyDecimalRule("Fare Amount")],
	amountLimitSchema: [onlyDecimalRule("Amount Limit")],
};
