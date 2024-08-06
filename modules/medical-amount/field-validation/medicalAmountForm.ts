import {
	maxRule,
	onlyDecimalRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const medicalAmountRules = {
	noticeSchema: [maxRule("notice", 200)],
	// endEffectiveDateSchema: [requiredRule("End Effective Date")],

	startEffectiveDateSchema: [requiredRule("Start Effective Date")],
	amountSchema: [onlyDecimalRule("Amount"), requiredRule("End Effective Date")],
	fareAmountSchema: [
		onlyDecimalRule("Fare Amount"),
		requiredRule("End Effective Date"),
	],
	amountLimitSchema: [
		onlyDecimalRule("Amount Limit"),
		requiredRule("End Effective Date"),
	],
};
