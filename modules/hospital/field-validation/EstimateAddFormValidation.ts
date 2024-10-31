import { requiredRule } from "wcf-component-lib/src/rules/FormRulesFunction";
import { estimateAddNames } from "../interfaces/estimateAddNames";

export const estimateAddRules = {
	hospitalNameSchema: [requiredRule(estimateAddNames.hospitalName)],
	typeSchema: [requiredRule(estimateAddNames.type)],
	nameSchema: [requiredRule(estimateAddNames.name)],
	lastNameSchema: [requiredRule(estimateAddNames.lastName)],
	emailSchema: [requiredRule(estimateAddNames.email)],
	referenceNumberSchema: [requiredRule(estimateAddNames.referenceNumber)],
	atDateSchema: [requiredRule(estimateAddNames.atDate)],
	reportDateSchema: [requiredRule(estimateAddNames.reportDate)],
	checkDateSchema: [requiredRule(estimateAddNames.checkDate)],
	resultSchema: [requiredRule(estimateAddNames.result)],
	detailSchema: [requiredRule(estimateAddNames.detail)],
};
