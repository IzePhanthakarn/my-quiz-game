import { requiredRule } from "wcf-component-lib/src/rules/FormRulesFunction";
import { estimateAddNames } from "../interfaces/estimateAddNames";

export const estimateAddRules = {
	hospital_nameSchema: [requiredRule(estimateAddNames.hospital_name)],
	typeSchema: [requiredRule(estimateAddNames.type)],
	userFirstNameSchema: [requiredRule(estimateAddNames.userFirstName)],
	userLastNameSchema: [requiredRule(estimateAddNames.userLastName)],
	emailSchema: [requiredRule(estimateAddNames.email)],
	refDocNoSchema: [requiredRule(estimateAddNames.refDocNo)],
	refDocDateSchema: [requiredRule(estimateAddNames.refDocDate)],
	notifyDateSchema: [requiredRule(estimateAddNames.notifyDate)],
	visitDateSchema: [requiredRule(estimateAddNames.visitDate)],
	resultStatusSchema: [requiredRule(estimateAddNames.resultStatus)],
	resultDescSchema: [requiredRule(estimateAddNames.resultDesc)],
};
